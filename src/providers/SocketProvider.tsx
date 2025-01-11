"use client";

import SocketContextProvider from "@/context/socketcontext";
import React, { ReactNode } from "react";

export default function SocketProvider({
  token,
  children,
}: {
  token: string;
  children: ReactNode;
}) {
  return (
    <SocketContextProvider token={token}>{children}</SocketContextProvider>
  );
}
