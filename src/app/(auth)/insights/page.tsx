"use client";

import { useGetInsights } from "@/api/insights";
import Filters, { PeriodState } from "@/app/components/blocks/filter";
import PageLayout from "@/app/components/blocks/page-layout";
import DashboardChart from "@/app/components/charts/dashboard";
import { InsightsDevicesChart } from "@/app/components/charts/insights-devices";
import { InsightsEntitiesChart } from "@/app/components/charts/insights-entities";
import { LoadingSpinner } from "@/app/components/other/spinner";
import notFound from "@/app/not-found";
import { Separator } from "@/components/ui/separator";
import { Building, HomeIcon, MonitorSpeaker } from "lucide-react";
import React from "react";

export default () => {
  const [period, setPeriod] = React.useState<PeriodState>("month");

  const { data, isFetching, error } = useGetInsights({
    period: period,
  });

  if (error || (!data && !isFetching)) return notFound();

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
      <div className="h-full flex flex-col xl:flex-row p-4 gap-6">
        <div className="flex flex-col h-auto xl:h-full w-full shrink-0 xl:w-2/6 bg-white rounded-lg shadow-md min-h-60">
          <div className="p-2">
            <h2 className="text-xs uppercase text-gray-600">
              Top 10 consumming devices
            </h2>
          </div>
          <Separator />
          <div className="p-4"></div>
        </div>
        <div className="flex flex-col h-auto h-full w-full gap-6 pb-16 xl:pb-0">
          <div className="grow bg-white rounded-lg shadow-md min-h-60 h-6/4">
            <div className="p-2">
              <h2 className="text-xs uppercase text-gray-600">
                Next week energy usage prediction per device
              </h2>
            </div>
            <Separator />
            <div className="p-4"></div>
          </div>
          <div className="h-2/6 bg-white rounded-lg shadow-md min-h-60 xl:min-h-auto">
            <div className="p-2">
              <h2 className="text-xs uppercase text-gray-600">
                Next week energy usage prediction
              </h2>
            </div>
            <Separator />
            <div className="p-2"></div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
