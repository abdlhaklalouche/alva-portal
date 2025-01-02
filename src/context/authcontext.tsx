"use client";

import User from "@/types/User";
import React from "react";

export const AuthContext = React.createContext<{
  token: string;
  user: User;
}>({
  token: "",
  user: {} as User,
});

export const AuthContextProvider = ({
  token,
  user,
  children,
}: {
  token: string;
  user: User;
  children: React.ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
