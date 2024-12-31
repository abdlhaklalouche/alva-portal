"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Save, Trash } from "lucide-react";

export default () => {
  return (
    <PageLayout
      name="Manage Devices"
      description="Manage all devices inside certain rooms and entities."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Manage Devices",
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
