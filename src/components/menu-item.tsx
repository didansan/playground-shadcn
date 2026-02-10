"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {useContext} from "react";
import {DrawerContext} from "@/components/ui/drawer";

type Props = {
  children: React.ReactNode;
  href: string;
};

export default function MenuItem({children, href}: Props) {
  const {onClose} = useContext(DrawerContext);
  const pathname = usePathname();
  const isActive = href === pathname;

  return <Link
    className={cn(
    "block px-2 py-1 text-base hover:bg-white dark:hover:bg-zinc-700 text-muted-foreground hover:text-foreground",
    isActive && "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-foreground",
  )}
    href={href}
    onClick={onClose}
  >{children}</Link>
}
