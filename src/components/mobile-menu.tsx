"use client"

import MainMenu from "@/components/main-menu";
import MenuTitle from "@/components/menu-title";
import {Drawer, DrawerContent, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {MenuIcon} from "lucide-react";
import {useMediaQuery} from "@/hooks/use-media-query";

export default function MobileMenu() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {!isDesktop && (
        <div className="flex top-0 left-0 p-2 md:hidden sticky bg-background border-b border-border justify-between items-center">
          <MenuTitle />
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle className="hidden">Navigation</DrawerTitle>
              <MainMenu className="h-screen"/>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </>
  );
}
