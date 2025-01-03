import Entity from "./Entity";
import User from "./User";

export default interface CurrentUser extends User {
  entities: Entity[];
}
