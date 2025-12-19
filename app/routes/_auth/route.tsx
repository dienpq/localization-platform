import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen w-screen items-center justify-center p-5 md:p-10">
      <Outlet />
    </main>
  );
}
