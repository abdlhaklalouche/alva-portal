"use client";

import SocketContextProvider from "@/context/socketcontext";
import React, { ReactNode } from "react";

export default function SocketProvider({ children }: { children: ReactNode }) {
  return <SocketContextProvider>{children}</SocketContextProvider>;
}
