"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InsightsDevice } from "@/types/Insights";
import { COLORS } from "@/data/colors";

const chartConfig = {} satisfies ChartConfig;

export default function InsightsPredictionDeviceChart({
  data,
}: {
  data: InsightsDevice[];
}) {
  const keys = Object.keys(data[0]?.devices ?? []);

  return (
    <div>
      <ChartContainer config={chartConfig} className="w-full h-[200px]">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 0,
            right: 16,
          }}
        >
          <CartesianGrid vertical={false} />
          <YAxis />
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
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          {keys.map((key, index) => (
            <Line
              key={index}
              name={key}
              dataKey={`devices.${key}`}
              label={key}
              type="monotone"
              fill={`url(#fill${index})`}
              stroke={COLORS[index]}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  );
}
