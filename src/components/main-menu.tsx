import MenuTitle from "@/components/menu-title";
import MenuItem from "@/components/menu-item";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Link from "next/link";
import {LightDarkToggle} from "@/components/light-dark-toggle";

export default function MainMenu() {
  return (
    <nav className="bg-muted overflow-auto p-4 flex flex-col">
      <header className="border-b border-b-zinc-300 dark:border-b-black pb-2">
        <MenuTitle />
      </header>
      <div className="py-4 grow">
        <MenuItem href="/dashboard">My dashboard</MenuItem>
        <MenuItem href="/teams">Teams</MenuItem>
        <MenuItem href="/employees">Employees</MenuItem>
        <MenuItem href="/account">Account</MenuItem>
        <MenuItem href="/settings">Settings</MenuItem>
      </div>
      <footer className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
            DB
          </AvatarFallback>
        </Avatar>
        <Link href="/" className='hover:underline'>Log out</Link>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}
