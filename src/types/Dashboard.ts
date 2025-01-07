export type Consumption = {
  key: string;
  value: number;
};

export default interface Dashboard {
  consumption: Consumption[];
  entities: number;
  rooms: number;
  devices: number;
}
