"use client";

import Entity from "@/types/Entity";
import React from "react";

export const EntityContext = React.createContext<{
  entity: Entity;
  setEntity: (entity: Entity) => void;
}>({
  entity: {} as Entity,
  setEntity: () => {},
});

export const EntityContextProvider = ({
  entity,
  children,
}: {
  entity: Entity;
  children: React.ReactNode;
}) => {
  const [activeEntity, setActiveEntity] = React.useState<Entity>(entity);

  const setEntity = (entity: Entity) => {
    setActiveEntity(entity);
  };

  return (
    <EntityContext.Provider value={{ entity: activeEntity, setEntity }}>
      {children}
    </EntityContext.Provider>
  );
};

export const useEntity = () => React.useContext(EntityContext);
