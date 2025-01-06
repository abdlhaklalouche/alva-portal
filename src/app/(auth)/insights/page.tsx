"use client";

import Filters, { PeriodState } from "@/app/components/blocks/filter";
import PageLayout from "@/app/components/blocks/page-layout";
import DashboardChart from "@/app/components/charts/dashboard";
import { InsightsDevicesChart } from "@/app/components/charts/insights-devices";
import { InsightsEntitiesChart } from "@/app/components/charts/insights-entities";
import { useEntity } from "@/context/entitycontext";
import React from "react";

export default () => {
  const [period, setPeriod] = React.useState<PeriodState>("week");

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
      <div className="h-full flex flex-col p-4 space-y-6 mb-8">
        <div className="flex justify-start w-full shrink-0 gap-6">
          <Filters
            period={period}
            handleSetPeriod={(period) => setPeriod(period)}
          />
        </div>
        <div className="flex flex-col grow h-full gap-6 w-full">
          <div className="h-1/3 bg-white shadow-md rounded-lg flex items-center px-6 py-3 font-medium gap-8 w-full">
            <InsightsDevicesChart />
          </div>
          <div className="grow h-full flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex flex-col bg-white rounded-lg p-6 shadow-md grow w-full h-full min-h-72">
              <DashboardChart />
            </div>
            <div className="h-full lg:w-96 shrink-0 bg-white shadow-md rounded-lg flex items-center px-6 py-3 font-medium gap-8">
              <InsightsEntitiesChart />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
