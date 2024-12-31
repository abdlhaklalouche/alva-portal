"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutList,
  MonitorSpeaker,
  Settings2,
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

// This is sample data.
const data = {
  user: {
    name: "Abdelhak Lallouche",
    email: "abdlhaklalouche@gmail.com",
    avatar: "/logo.jpg",
  },
  entities: [
    {
      name: "My House",
      logo: GalleryVerticalEnd,
      type: "House",
    },
    {
      name: "Warehouse",
      logo: AudioWaveform,
      type: "Building",
    },
    {
      name: "Office",
      logo: Command,
      type: "Building",
    },
  ],
  navMain: [
    {
      title: "Main",
      url: "/",
      icon: LayoutList,
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
      ],
    },
    {
      title: "Manage",
      url: "/manage",
      icon: MonitorSpeaker,
      items: [
        {
          title: "Entities",
          url: "/manage/entities",
        },
        {
          title: "Devices",
          url: "/manage/devices",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Account",
          url: "/settings/account",
        },
        {
          title: "Users",
          url: "/settings/users",
        },
        {
          title: "Entity Types",
          url: "/settings/entity-types",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarBrand />
      <SidebarHeader>
        <EntitiesSwitcher entities={data.entities} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
