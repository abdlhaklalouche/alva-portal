"use client";

import React, { createContext, useEffect, useState } from "react";
import * as io from "socket.io-client";

type SocketContextProps = { socket: io.Socket | undefined };

const SocketContext = createContext<SocketContextProps>({
  socket: undefined,
});

export default function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<io.Socket>();

  useEffect(() => {
    let socket = io.connect(process.env.NEXT_PUBLIC_BACKEND_URL);

    socket.on("receive_message", (data) => {});

    socket.on("users_response", (data) => {});

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => React.useContext(SocketContext);
