"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Plus, Save, Trash } from "lucide-react";

export default () => {
  return (
    <PageLayout
      name="Manage Entities"
      description="Manage all entities eg: Your house, office, etc.."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Manage Entities",
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
