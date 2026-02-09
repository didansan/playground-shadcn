"use client"

import React from "react";
import {Input} from "@/components/ui/input";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {cn} from "@/lib/utils";

export type PasswordProps = React.HTMLProps<HTMLInputElement>;

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, type, ...props}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative" ref={ref}>
        <Input {...props} ref={ref} className={cn("pr-10", className)} type={showPassword ? "text" : "password"} />
        <span className="absolute top-[6px] right-2 cursor-pointer select-none" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeIcon/> : <EyeOffIcon/>}
        </span>
      </div>
    );
  }
);

Password.displayName = "Password";

export { Password };
