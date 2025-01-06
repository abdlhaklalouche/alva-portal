"use client";

import Filters, { PeriodState } from "@/app/components/blocks/filter";
import PageLayout from "@/app/components/blocks/page-layout";
import DashboardChart from "@/app/components/charts/dashboard";
import { Building, HomeIcon, MonitorSpeaker } from "lucide-react";
import React from "react";

export default () => {
  const [period, setPeriod] = React.useState<PeriodState>("week");

  return (
    <PageLayout
      name="Dashboard"
      description="Checking total counts, energy consumption."
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
      <div className="h-full flex flex-col p-4 space-y-6">
        <div className="flex justify-start w-full shrink-0 gap-6">
          <Filters
            period={period}
            handleSetPeriod={(period) => setPeriod(period)}
          />
        </div>
        <div className="grow h-full flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-col bg-white rounded-lg p-6 shadow-md grow w-full h-full min-h-96">
            <DashboardChart />
          </div>
          <div className="h-full flex flex-col w-full lg:w-96 shrink-0 space-y-6">
            <div className="flex-1 bg-white shadow-md rounded-lg flex items-center px-6 py-3 font-medium gap-8">
              <div className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                <Building className="h-8 w-8 stroke-current text-white transform transition-transform duration-500 ease-in-out" />
              </div>
              <div>
                <p className="text-2xl font-bold">557</p>
                <p className="text-sm text-gray-600">Entities</p>
              </div>
            </div>
            <div className="flex-1 bg-white shadow-md rounded-lg flex items-center px-6 py-3 font-medium gap-8">
              <div className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                <HomeIcon className="h-8 w-8 stroke-current text-white transform transition-transform duration-500 ease-in-out" />
              </div>
              <div>
                <p className="text-2xl font-bold">557</p>
                <p className="text-sm text-gray-600">Rooms</p>
              </div>
            </div>
            <div className="flex-1 bg-white shadow-md rounded-lg flex items-center px-6 py-3 font-medium gap-8">
              <div className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                <MonitorSpeaker className="h-8 w-8 stroke-current text-white transform transition-transform duration-500 ease-in-out" />
              </div>
              <div>
                <p className="text-2xl font-bold">557</p>
                <p className="text-sm text-gray-600">Devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
