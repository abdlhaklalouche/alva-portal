"use client";

import { AuthContextProvider } from "@/context/authcontext";
import axios from "@/lib/axios";
import CurrentUser from "@/types/CurrentUser";
import React, { ReactNode } from "react";

export default function AuthProvider({
  token,
  user,
  children,
}: {
  token: string;
  user: CurrentUser;
  children: ReactNode;
}) {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config;
  });

  return (
    <AuthContextProvider token={token} user={user}>
      {children}
    </AuthContextProvider>
  );
}
