"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutList,
  Map,
  MonitorSpeaker,
  PieChart,
  Settings2,
  SquareTerminal,
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
      url: "#",
      icon: LayoutList,
      isActive: false,
      items: [
        {
          title: "Home",
          url: "#",
        },
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Insights",
          url: "#",
        },
      ],
    },
    {
      title: "Manage",
      url: "#",
      icon: MonitorSpeaker,
      items: [
        {
          title: "Entities",
          url: "#",
        },
        {
          title: "Devices",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Account",
          url: "/account",
        },
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Entity Types",
          url: "/entity-types",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarBrand />
      <SidebarHeader>
        <EntitiesSwitcher entities={data.entities} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
