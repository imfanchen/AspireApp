import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavigationProgress } from "@/components/layouts/navigation-progress";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Header } from "@/components/layouts/header";
import { NavigationBar } from "@/components/layouts/navigation-bar";
import { ThemeSwitch } from "@/components/layouts/theme-switch";
import { NotFoundError } from "@/components/errors/not-found-error";
import { InternalServerError } from "@/components/errors/internal-server-error";
import { type QueryClient } from "@tanstack/react-query";

interface RouterContext {
  queryClient: QueryClient;
}

const RootComponent = () => (
  <>
    <NavigationProgress />
    <Toaster duration={5000} />
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header>
          <SidebarTrigger variant="outline" className="max-md:scale-125" />
          <Separator orientation="vertical" className="h-6" />
          <NavigationBar />
          <div className="ms-auto flex items-center space-x-4">
            <ThemeSwitch />
          </div>
        </Header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
    {import.meta.env.MODE === "development" && (
      <>
        <ReactQueryDevtools buttonPosition="top-right" />
        <TanStackRouterDevtools position="bottom-right" />
      </>
    )}
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundError,
  errorComponent: InternalServerError,
});
