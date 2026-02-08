export default function LoggedOutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-24">
      {children}
    </div>
  );
}
