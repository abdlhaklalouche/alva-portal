"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Consumption } from "@/types/Dashboard";

export default function DashboardChart({ data }: { data: Consumption[] }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col h-full grow items-center justify-center">
        <ChartContainer
          config={{
            value: {
              label: "Kwh",
              color: "hsl(var(--foreground))",
            },
          }}
          className="h-60 w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
            height={150}
            width={200}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-value)",
              }}
              activeDot={{
                r: 6,
              }}
            ></Line>
          </LineChart>
        </ChartContainer>
      </div>
      <div className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-xs text-muted-foreground">
          Showing total energy consumption during the selected period
        </div>
      </div>
    </div>
  );
}
