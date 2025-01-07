import { Consumption } from "./Dashboard";

export type EntityConsumption = {
  entity: string;
  consumption: number;
  fill: string;
};

export type DeviceConsumption = {
  date: string;
  devices: {
    [key: string]: number;
  };
};

export default interface Insights {
  consumption: Consumption[];
  entities_consumption: EntityConsumption[];
  devices_consumption: DeviceConsumption[];
}
