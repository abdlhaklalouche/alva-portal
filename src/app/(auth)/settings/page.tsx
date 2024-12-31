"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { Save } from "lucide-react";

export default () => {
  return (
    <PageLayout
      name="General Settings"
      description="System settings and personalization."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Settings",
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
