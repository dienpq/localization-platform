import { AppSidebar, BreadcrumbHeader } from './_components';
import { Outlet } from 'react-router';
import { ThemeSwitch } from '~/components/common';
import {
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui';
import { BreadcrumbProvider } from '~/providers';

export default function MainLayout() {
  return (
    <BreadcrumbProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background fixed top-0 right-0 z-30 flex h-16 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 group-has-data-[collapsible=icon]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width-icon))] md:w-[calc(100%-var(--sidebar-width))]">
            <div className="flex w-full items-center justify-between gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <BreadcrumbHeader />
              <div className="ml-auto">
                <ThemeSwitch />
              </div>
            </div>
          </header>
          <main className="mt-16 p-4 group-has-data-[collapsible=icon]/sidebar-wrapper:mt-12">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </BreadcrumbProvider>
  );
}
