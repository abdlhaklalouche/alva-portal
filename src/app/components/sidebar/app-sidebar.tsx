"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutList,
  MonitorSpeaker,
  Settings2,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { EntitiesSwitcher } from "./entities-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import SidebarBrand from "./brand";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authcontext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user } = useAuth();

  const data = {
    navMain: [
      {
        title: "Main",
        url: "/",
        icon: LayoutList,
        hidden: false,
        items: [
          {
            title: "Home",
            url: "/",
          },
          {
            title: "Dashboard",
            url: "/dashboard",
          },
          {
            title: "Insights",
            url: "/insights",
          },
          {
            title: "Entities",
            url: "/entities",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        hidden: false,
        items: [
          {
            title: "General",
            url: "/settings",
          },
          {
            title: "Account",
            url: "/settings/account",
          },
        ],
      },
      {
        title: "Sys Admin",
        url: "/sys-admin",
        icon: Shield,
        hidden: !user.is_system_admin,
        items: [
          {
            title: "Users",
            url: "/sys-admin/users",
          },
          {
            title: "Entity Types",
            url: "/sys-admin/entity-types",
          },
          {
            title: "Entities",
            url: "/sys-admin/entities",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarBrand />
      {user.entities.length > 0 && (
        <SidebarHeader>
          <EntitiesSwitcher entities={user.entities} />
        </SidebarHeader>
      )}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
