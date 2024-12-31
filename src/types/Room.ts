import Entity from "./Entity";

export default interface Room {
  id: string;
  name: string;
  entity: Entity;
}
