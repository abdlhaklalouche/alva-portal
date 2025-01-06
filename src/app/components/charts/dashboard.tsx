"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", kwh: 186 },
  { month: "February", kwh: 305 },
  { month: "March", kwh: 237 },
  { month: "April", kwh: 73 },
  { month: "May", kwh: 209 },
  { month: "June", kwh: 214 },
  { month: "January", kwh: 186 },
  { month: "February", kwh: 305 },
  { month: "March", kwh: 237 },
  { month: "April", kwh: 73 },
  { month: "May", kwh: 209 },
  { month: "June", kwh: 214 },
];

export default function DashboardChart() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col h-full grow items-center justify-center">
        <ChartContainer
          config={{
            kwh: {
              label: "Kwh",
              color: "hsl(var(--foreground))",
            },
          }}
          className="h-60 w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="kwh"
              type="natural"
              stroke="var(--color-kwh)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-kwh)",
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
