"use client"

import React from "react";
import {useForm, useStore} from "@tanstack/react-form";
import { format } from "date-fns"
import Link from "next/link";
import { CalendarIcon } from "lucide-react"
import { ro } from "react-day-picker/locale";
import {toast} from "sonner"
import * as z from "zod"

import {Button} from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Password} from "@/components/ui/password";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useRouter} from "next/router";

const accountTypes = ['personal', 'company'];
const formSchema = z
  .object({
  email: z.email('Invalid email address.'),
  accountType: z.enum(accountTypes, 'Please select an account type.'),
  companyName: z.string().optional(),
  employees: z.coerce.number().optional(),
  acceptTerms: z.coerce.boolean().refine(accepted => accepted, "You must accept the terms and conditions."),
  dob: z.date().optional().refine(date => {
    if (typeof date === "undefined") return false;

    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    return date <= eighteenYearsAgo
  }, {message: "You must be at least 18 years old."}),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: z
    .string()
    .min(8, "Password confirmation must be at least 8 characters long"),
})
  .superRefine((data, ctx) => {
    if (data.accountType === "company") {
      if (!data.companyName) {
        ctx.addIssue({
          code: "custom",
          path: ["companyName"],
          message: "Company name is required.",
        });
      }

      if (!data.employees || data.employees < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["employees"],
          message: "Number of Employees is required.",
        });
      }
    }
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

type SchemaValues = z.input<typeof formSchema>;

const defaultFormValues: SchemaValues = {
  email: "",
  accountType: "",
  companyName: undefined,
  employees: undefined,
  acceptTerms: false,
  dob: undefined,
  password: "",
  passwordConfirmation: ""
};

export function RegisterForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: defaultFormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({value}) => {
      toast("You registered with the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify({...value, password: "********", passwordConfirmation: "********"}, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
      await router.push("/dashboard");
    },
  });

  const accountType = useStore(form.store, (state) => state.values.accountType);
  const [dobOpen, setDobOpen] = React.useState(false);

  return (
    <form
      id="register-form"
      onSubmit={e => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldSet className="w-full @xs:max-w-xs max-w-lg">
        <FieldGroup>
          <form.Field name="email">
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    type="email"
                    placeholder="Email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  <FieldDescription>
                    This is the email address you will sing in to SupportMe with
                  </FieldDescription>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}/>
                  )}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="accountType">
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Account Type</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={next => {
                      field.handleChange(next);

                      if (next === 'personal') {
                        form.setFieldValue('companyName', undefined);
                        form.setFieldValue('employees', undefined);
                      }
                    }}
                  >
                    <SelectTrigger
                      id={field.name}
                      className="w-full max-w-sm"
                      aria-invalid={isInvalid}
                      onBlur={field.handleBlur}
                    >
                      <SelectValue placeholder="Select Account Type" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectGroup>
                        <SelectLabel>Account type</SelectLabel>
                        {accountTypes.map(accountType => (
                          <SelectItem key={accountType} value={accountType}>
                            {accountType}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {isInvalid && (<FieldError errors={field.state.meta.errors}/>)}
                </Field>
              );
            }}
          </form.Field>
          {accountType === 'company' && <form.Field name="companyName">
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Company name</FieldLabel>
                  <Input
                    id={field.name}
                    type="text"
                    placeholder="Company name"
                    value={field.state.value ?? ''}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (<FieldError errors={field.state.meta.errors}/>)}
                </Field>
              );
            }}
          </form.Field>}
          {accountType === 'company' && <form.Field name="employees">
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Employees</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    placeholder="Employees"
                    value={typeof field.state.value === "number" || typeof field.state.value === "string" ? field.state.value : ""}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (<FieldError errors={field.state.meta.errors}/>)}
                </Field>
              );
            }}
          </form.Field>}
          <form.Field name="dob">
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              const today = new Date();
              const disableBeforeDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

              return (
                <Field data-invalid={isInvalid} className="mx-auto">
                  <FieldLabel htmlFor={field.name}>Date of birth</FieldLabel>
                  <Popover open={dobOpen} onOpenChange={setDobOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id={field.name}
                        variant="outline"
                        data-empty={!field.state.value}
                        className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal"
                      >
                        {field.state.value ? format(field.state.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Calendar
                        className="w-full"
                        mode="single"
                        captionLayout="dropdown"
                        defaultMonth={field.state.value}
                        selected={field.state.value}
                        onSelect={(date) => {
                          field.handleChange(date);
                          setDobOpen(false);
                        }}
                        fixedWeeks
                        locale={ro}
                        weekStartsOn={1}
                        startMonth={disableBeforeDate}
                        disabled={{ before: disableBeforeDate, after: new Date() }}
                      />
                    </PopoverContent>
                  </Popover>
                  {isInvalid && (<FieldError errors={field.state.meta.errors}/>)}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Password
                    id={field.name}
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (<FieldError errors={field.state.meta.errors}/>)}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="passwordConfirmation">
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password confirmation</FieldLabel>
                  <Password
                    id={field.name}
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (<FieldError errors={field.state.meta.errors}/>)}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="acceptTerms">
            {field => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field orientation="horizontal" data-invalid={isInvalid}>
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    aria-invalid={isInvalid}
                    checked={!!field.state.value}
                    onCheckedChange={e => field.handleChange(!!e)}
                    onBlur={field.handleBlur}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Accept terms and conditions</FieldLabel>
                    <FieldDescription>
                      By signing up you agree to our&nbsp;
                      <Link href="/terms">terms and conditions</Link>.
                    </FieldDescription>
                    {isInvalid && (<FieldError errors={field.state.meta.errors}/>)}
                  </FieldContent>
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <Button type="submit" form="register-form" className="cursor-pointer">
          Register
        </Button>
      </FieldSet>
    </form>
  )
}
