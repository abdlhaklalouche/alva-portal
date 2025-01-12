"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InsightsOverall } from "@/types/Insights";

const chartConfig = {
  total: {
    label: "Consumption",
  },
} satisfies ChartConfig;

export default function InsightsPredictionOverallChart({
  data,
}: {
  data: InsightsOverall[];
}) {
  //prettier-ignore
  const total = React.useMemo(() => data.reduce((acc, curr: InsightsOverall) => acc + curr.total, 0), []);

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto w-full h-[200px]"
      >
        <BarChart
          accessibilityLayer
          data={data}
          margin={{
            left: 0,
            right: 16,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis dataKey="total" />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Bar dataKey="total" fill={`var(--color-total)`} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
