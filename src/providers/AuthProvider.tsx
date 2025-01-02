"use client";

import { AuthContextProvider } from "@/context/authcontext";
import axios from "@/lib/axios";
import User from "@/types/User";
import React, { ReactNode } from "react";

export default function AuthProvider({
  token,
  user,
  children,
}: {
  token: string;
  user: User;
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
