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
  return (
    <EntityContextProvider entity={user.entities[0]}>
      {children}
    </EntityContextProvider>
  );
}
