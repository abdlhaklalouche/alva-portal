"use client";

import PageLayout from "@/app/components/blocks/page-layout";
import { useEntity } from "@/context/entitycontext";
import React from "react";

export default () => {
  const { entity } = useEntity();

  return (
    <PageLayout
      name="Insights"
      description="Your personalized hub for insights."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Insights",
        },
      ]}
    >
      <div className="p-4"></div>
    </PageLayout>
  );
};
