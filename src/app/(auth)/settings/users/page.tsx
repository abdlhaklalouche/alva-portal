"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Trash } from "lucide-react";

export default () => {
  return (
    <PageLayout
      name="Users"
      description="All users of the system."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Settings",
          link: "/settings",
        },
        {
          name: "Users",
        },
      ]}
      actions={[
        {
          type: "link",
          name: "New",
          icon: Plus,
          href: "#",
        },
        {
          type: "button",
          name: "Delete",
          icon: Trash,
          onClick: () => {},
        },
      ]}
    ></PageLayout>
  );
};
