"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EntityConsumption } from "@/types/Insights";

const chartConfig = {
  consumption: {
    label: "Consumption",
  },
} satisfies ChartConfig;

export function InsightsEntitiesChart({ data }: { data: EntityConsumption[] }) {
  const totalConsumption = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.consumption, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="consumption"
              nameKey="entity"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalConsumption.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          kWh
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="flex-col gap-2 text-sm">
        <div className="leading-none text-xs text-muted-foreground">
          Energy consumption by entities for the selected period
        </div>
      </div>
    </div>
  );
}
