"use client";

import { Plus } from "lucide-react";
import PageLayout from "../components/blocks/page-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authcontext";

export default () => {
  const { user } = useAuth();

  const items = [
    {
      title: "Dashboard",
      subtitle: "Main",
      url: "/dashboard",
      hidden: false,
    },
    {
      title: "Insights",
      subtitle: "Main",
      url: "/insights",
      hidden: false,
    },
    {
      title: "Entities",
      subtitle: "Main",
      url: "/entities",
      hidden: false,
    },
    {
      title: "Devices",
      subtitle: "Main",
      url: "/devices",
      hidden: false,
    },
    {
      title: "General Settings",
      subtitle: "Settings",
      url: "/settings",
      hidden: false,
    },
    {
      title: "Account",
      subtitle: "Settings",
      url: "/settings/account",
      hidden: false,
    },
    {
      title: "Users",
      subtitle: "System Admin",
      url: "/sys-admin/users",
      hidden: !user.is_system_admin,
    },
    {
      title: "Entity Types",
      subtitle: "System Admin",
      url: "/sys-admin/entity-types",
      hidden: !user.is_system_admin,
    },
    {
      title: "Entities",
      subtitle: "System Admin",
      url: "/sys-admin/entities",
      hidden: !user.is_system_admin,
    },
    {
      title: "Devices",
      subtitle: "System Admin",
      url: "/sys-admin/devices",
      hidden: !user.is_system_admin,
    },
  ];

  return (
    <PageLayout
      name="Home Page"
      description="Empowering you with insights and tools to monitor, manage, and optimize your energy consumption effectively."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Dashboard",
        },
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {items.map(
          (item, index) =>
            !item.hidden && (
              <div key={index}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-4 h-20 hover:bg-stone-100 shadow-sm"
                  asChild
                >
                  <a href={item.url}>
                    <div className="flex flex-col text-start">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-xs font-normal text-gray-400">
                        {item.subtitle}
                      </span>
                    </div>
                  </a>
                </Button>
              </div>
            )
        )}
      </div>
    </PageLayout>
  );
};
