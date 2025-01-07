import { PeriodState } from "@/app/components/blocks/filter";
import axios from "@/lib/axios";
import Dashboard from "@/types/Dashboard";
import Insights from "@/types/Insights";
import { useQuery } from "@tanstack/react-query";

export const insightsKeys = {
  dashboard: "dashboard",
  insights: "insights",
};

export const useGetDashboard = ({ period }: { period: PeriodState }) =>
  useQuery({
    queryKey: [insightsKeys.dashboard, period],
    queryFn: async () => {
      const { data } = await axios.get(`/insights/dashboard?period=${period}`);

      const responseData = data as Dashboard;

      return responseData;
    },
    enabled: true,
    refetchOnWindowFocus: true,
  });

export const useGetInsights = ({ period }: { period: PeriodState }) =>
  useQuery({
    queryKey: [insightsKeys.insights, period],
    queryFn: async () => {
      const { data } = await axios.get(`/insights?period=${period}`);

      const responseData = data as Insights;

      return responseData;
    },
    enabled: true,
    refetchOnWindowFocus: true,
  });
