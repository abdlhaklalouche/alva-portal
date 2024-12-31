"use client";

import { Plus } from "lucide-react";
import PageLayout from "../components/blocks/page-layout";

export default () => {
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
    ></PageLayout>
  );
};
