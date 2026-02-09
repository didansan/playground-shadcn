"use client"

import React from "react";
import {useForm} from "@tanstack/react-form";
import {toast} from "sonner"
import * as z from "zod"
import {Button} from "@/components/ui/button"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Password} from "@/components/ui/password";

const formSchema = z.object({
  email: z.email('Invalid email address.'),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
})

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({value}) => {
      toast("You logged in with the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify({...value, password: "********"}, null, 2)}</code>
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
    },
  });

  return (
    <form
      id="login-form"
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
                    This is the email address you signed up to SupportMe with
                  </FieldDescription>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}/>
                  )}
                </Field>
              )
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
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}/>
                  )}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <Button type="submit" form="login-form">
          Login
        </Button>
      </FieldSet>
    </form>
  )
}
