export type InsightsOverall = {
  date: string;
  total: number;
};

export type InsightsDevice = {
  date: string;
  devices: {
    [key: string]: number;
  };
};

export default interface Insights {
  devices: InsightsDevice[];
  overall: InsightsOverall[];
}
