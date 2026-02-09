import {PersonStandingIcon} from "lucide-react";
import * as z from "zod"
import Link from "next/link";
import {RegisterForm} from "@/app/(logged-out)/sign-up/registerForm";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
})

export default function Page() {
  return (
    <>
      <p><PersonStandingIcon size={50} className="text-pink-500"/></p>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Sign up to your SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm"><Link href="/login">Login</Link></Button>
        </CardFooter>
      </Card>
    </>
  );
}
