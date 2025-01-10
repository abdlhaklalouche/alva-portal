"use client";

import { useGetInsights } from "@/api/insights";
import Filters, { PeriodState } from "@/app/components/blocks/filter";
import PageLayout from "@/app/components/blocks/page-layout";
import DashboardChart from "@/app/components/charts/dashboard";
import { InsightsDevicesChart } from "@/app/components/charts/insights-devices";
import { InsightsEntitiesChart } from "@/app/components/charts/insights-entities";
import { LoadingSpinner } from "@/app/components/other/spinner";
import notFound from "@/app/not-found";
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
      <div className="h-full flex flex-col p-4 space-y-6 mb-8">
        <div className="flex justify-start w-full shrink-0 gap-6">
          <fieldset disabled={isFetching}>
            <Filters
              period={period}
              handleSetPeriod={(period) => setPeriod(period)}
            />
          </fieldset>
        </div>

        <div className="flex flex-row w-full shrink-0 gap-6"></div>
      </div>
    </PageLayout>
  );
};
