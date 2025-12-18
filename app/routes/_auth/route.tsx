export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen items-center justify-center p-5 md:p-10">
      {children}
    </main>
  );
}
