"use client";

import { useGetDashboard, useGetInsights } from "@/api/insights";
import Filters, { PeriodState } from "@/app/components/blocks/filter";
import PageLayout from "@/app/components/blocks/page-layout";
import DashboardChart from "@/app/components/charts/dashboard";
import { InsightsDevicesChart } from "@/app/components/charts/insights-devices";
import { InsightsEntitiesChart } from "@/app/components/charts/insights-entities";
import { LoadingSpinner } from "@/app/components/other/spinner";
import notFound from "@/app/not-found";
import { useSocket } from "@/context/socketcontext";
import { Building, HomeIcon, MonitorSpeaker } from "lucide-react";
import React from "react";

export default () => {
  const [period, setPeriod] = React.useState<PeriodState>("month");

  const { data, isFetching, isLoading, error, refetch } = useGetDashboard({
    period: period,
  });

  if (error || (!data && !isFetching)) return notFound();

  const { socket } = useSocket();

  // Refetch dashboard if any change in data.
  socket?.on("dashboard_changed", () => refetch());

  return (
    <PageLayout
      name="Dashboard"
      description="Your overall data visualization dashboard."
      breadcrumbs={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Dashboard",
        },
      ]}
    >
      <div className="flex flex-col p-4 space-y-6 mb-8 pb-12">
        <div className="flex justify-start w-full shrink-0 gap-6">
          <fieldset disabled={isFetching}>
            <Filters
              period={period}
              handleSetPeriod={(period) => setPeriod(period)}
            />
          </fieldset>
        </div>

        <div className="flex flex-row w-full shrink-0 gap-6">
          <div className="flex-1 bg-white shadow-md rounded-lg flex items-center justify-center px-6 py-3 font-medium gap-8 w-full">
            {isLoading ? (
              <div className="h-full flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                  <Building className="h-8 w-8 stroke-current text-white transform transition-transform duration-500 ease-in-out" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data!.counts.entities}</p>
                  <p className="text-sm text-gray-600">Entities</p>
                </div>
              </>
            )}
          </div>
          <div className="flex-1 bg-white shadow-md rounded-lg flex items-center justify-center px-6 py-3 font-medium gap-8 w-full">
            {isLoading ? (
              <div className="h-full flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                  <HomeIcon className="h-8 w-8 stroke-current text-white transform transition-transform duration-500 ease-in-out" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data!.counts.rooms}</p>
                  <p className="text-sm text-gray-600">Rooms</p>
                </div>
              </>
            )}
          </div>
          <div className="flex-1 bg-white shadow-md rounded-lg flex items-center justify-center px-6 py-3 font-medium gap-8 w-full">
            {isLoading ? (
              <div className="h-full flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                  <MonitorSpeaker className="h-8 w-8 stroke-current text-white transform transition-transform duration-500 ease-in-out" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data!.counts.devices}</p>
                  <p className="text-sm text-gray-600">Devices</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col grow h-full gap-6 w-full">
          <div className="h-1/3 bg-white shadow-md rounded-lg flex items-center justify-center px-6 py-3 font-medium gap-8 w-full">
            {isLoading ? (
              <div className="h-full flex justify-center items-center w-full">
                <LoadingSpinner />
              </div>
            ) : (
              <InsightsDevicesChart data={data!.devices_consumption} />
            )}
          </div>
          <div className="grow h-full flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex flex-col bg-white rounded-lg p-6 shadow-md grow w-full h-full min-h-72">
              {isLoading ? (
                <div className="h-full flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <DashboardChart data={data!.consumption} />
              )}
            </div>
            <div className="h-full lg:w-96 shrink-0 bg-white shadow-md rounded-lg flex items-center justify-center px-6 py-3 font-medium gap-8">
              {isLoading ? (
                <div className="h-full flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <InsightsEntitiesChart data={data!.entities_consumption} />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
