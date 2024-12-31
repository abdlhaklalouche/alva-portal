"use client";

import PageLayout from "@/app/components/blocks/page-layout";

export default () => {
  return (
    <PageLayout
      name="Dashboard"
      description="Your personalized hub for insights, updates, and quick access to essential tools and features."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Dashboard",
        },
      ]}
    ></PageLayout>
  );
};
