import EntityType from "./EntityType";
import Room from "./Room";
import User from "./User";

export default interface Entity {
  id: string;
  user: User;
  name: string;
  type: EntityType;
  rooms: Room[];
}
