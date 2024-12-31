import Room from "./Room";

export default interface Device {
  id: string;
  name: string;
  room: Room;
}
