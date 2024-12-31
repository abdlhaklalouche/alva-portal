"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Save, Trash } from "lucide-react";

export default () => {
  return (
    <PageLayout
      name="Entity Types"
      description="Change account details."
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
          name: "Entity Types",
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
