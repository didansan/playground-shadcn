import MainMenu from "@/components/main-menu";
import MobileMenu from "@/components/mobile-menu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
    <MainMenu className="hidden md:flex" />
    <MobileMenu/>
    <div className="overflow-auto py-2 px-4">
      <h1 className="pb-4">Welcome back, Dan</h1>
      {children}
    </div>
  </div>
}
