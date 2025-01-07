"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, Legend, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DeviceConsumption } from "@/types/Insights";
import { COLORS } from "@/data/colors";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export function InsightsDevicesChart({ data }: { data: DeviceConsumption[] }) {
  const keys = Object.keys(data[0]?.devices);

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="h-[150px] w-full">
        <AreaChart data={data} accessibilityLayer>
          <defs>
            {keys.map((key, index) => (
              <linearGradient
                id={`fill${index}`}
                key={index}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={COLORS[index]} stopOpacity={0.8} />
                <stop
                  offset="95%"
                  stopColor={COLORS[index]}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            fontSize={10}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                indicator="dot"
              />
            }
          />
          {keys.map((key, index) => (
            <Area
              key={index}
              name={key}
              dataKey={`devices.${key}`}
              label={key}
              type="monotone"
              fill={`url(#fill${index})`}
              stroke={COLORS[index]}
            />
          ))}
          <Legend />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
