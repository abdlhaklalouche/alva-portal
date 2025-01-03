"use client";

import CurrentUser from "@/types/CurrentUser";
import React from "react";

export const AuthContext = React.createContext<{
  token: string;
  user: CurrentUser;
}>({
  token: "",
  user: {} as CurrentUser,
});

export const AuthContextProvider = ({
  token,
  user,
  children,
}: {
  token: string;
  user: CurrentUser;
  children: React.ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
