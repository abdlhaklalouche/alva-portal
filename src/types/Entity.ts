import EntityType from "./EntityType";

export default interface Entity {
  id: string;
  name: string;
  type: EntityType;
}
