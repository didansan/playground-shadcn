import {Button} from "@/components/ui/button";
import {PersonStandingIcon} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="flex gap-2 items-center"><PersonStandingIcon size={50} className="text-pink-500"/> SupportMe</h1>
      <p>
        The best dashboard to manage customer support
      </p>
      <div className="flex gap-4 items-center">
        <Button asChild><Link href="/login">Login</Link></Button>
        <small>or</small>
        <Button variant="outline" asChild><Link href="/register">Sign up</Link></Button>
      </div>
    </>
  );
}
