export type Consumption = {
  key: string;
  value: number;
};

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

export default interface Dashboard {
  consumption: Consumption[];
  entities_consumption: EntityConsumption[];
  devices_consumption: DeviceConsumption[];
  counts: {
    entities: number;
    rooms: number;
    devices: number;
  };
}
