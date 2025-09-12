"use client";

import * as React from "react";
import {
  FileUser,
  LifeBuoy,
  PackageSearch,
  ShoppingCart,
  Send,
  Users,
  MessageSquareMore
} from "lucide-react";

import { NavigationMain } from "@/components/layouts/navigation-main";
import { NavigationSecondary } from "@/components/layouts/navigation-secondary";
import { NavigationUser } from "@/components/layouts/navigation-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Fan Chen",
    email: "fan.chen@example.com",
    avatar: "/avatars/fchen.jpg",
  },
  navMain: [
    {
      title: "Shopping",
      url: "/",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Orders",
          url: "/orders",
          icon: ShoppingCart,
        },
        {
          title: "Products",
          url: "/products",
          icon: PackageSearch,
        },
        {
          title: "Customers",
          url: "/customers",
          icon: Users,
        },
        {
          title: "Employees",
          url: "/employees",
          icon: FileUser,
        },
      ],
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageSquareMore,
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/logo-white.svg" alt="logo" className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    College Point Technology
                  </span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavigationMain items={data.navMain} />
        <NavigationSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavigationUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}