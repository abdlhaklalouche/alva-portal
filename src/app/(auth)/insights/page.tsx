"use client";

import PageLayout from "@/app/components/blocks/page-layout";

export default () => {
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
    ></PageLayout>
  );
};
