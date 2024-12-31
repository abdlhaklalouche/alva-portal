"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Save } from "lucide-react";

export default () => {
  return (
    <PageLayout
      name="Account Settings"
      description="Change account details."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Account Settings",
          link: "/settings/account",
        },
        {
          name: "Users",
        },
      ]}
      actions={[
        {
          type: "button",
          name: "Save",
          icon: Save,
          onClick: () => {},
        },
      ]}
    ></PageLayout>
  );
};
