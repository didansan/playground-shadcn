"use client"

import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "lucide-react";
import {useTheme} from "next-themes"

export function LightDarkToggle({
  className
}: { className?: string }) {
  const {setTheme, resolvedTheme} = useTheme();
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <Tooltip>
      <TooltipTrigger className={className} asChild>
        <Button variant="outline" onClick={toggleTheme}>
          <SunIcon className="block dark:hidden"/>
          <MoonIcon className="hidden dark:block"/>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span className="hidden dark:block">Enable light mode</span>
        <span className="block dark:hidden">Enable dark mode</span>
      </TooltipContent>
    </Tooltip>
  );
}
