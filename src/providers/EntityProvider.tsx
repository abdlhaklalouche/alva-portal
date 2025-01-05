"use client";

import { EntityContextProvider } from "@/context/entitycontext";
import CurrentUser from "@/types/CurrentUser";
import React, { ReactNode } from "react";

export default function EntityProvider({
  user,
  children,
}: {
  user: CurrentUser;
  children: ReactNode;
}) {
  const entity_id = localStorage.getItem("entity") ?? "";

  const entity =
    user.entities.find((item) => item.id == entity_id) ?? user.entities[0];

  return (
    <EntityContextProvider entity={entity}>{children}</EntityContextProvider>
  );
}
