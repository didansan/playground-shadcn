import {PersonStandingIcon} from "lucide-react";
import * as z from "zod"
import {LoginForm} from "@/app/(logged-out)/login/loginForm";
import Link from "next/link";

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
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="justify-between items-center">
          <small>Don&#39;t have an account?</small>
          <Button asChild variant="outline" size="sm"><Link href="/sign-up">Sign Up</Link></Button>
        </CardFooter>
      </Card>
    </>
  );
}
