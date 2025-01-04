import { DeviceStatus } from "@/enums/DeviceStatus";
import Room from "./Room";
import DeviceEnergy from "./DeviceEnergy";

export default interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  room: Room;
  energies: DeviceEnergy[];
}
