"use client";

import { toast } from "@/hooks/use-toast";
import { getTokenFromCookies, pushNotification } from "@/lib/utils";
import INotification from "@/types/INotification";
import React, { createContext, useEffect, useState } from "react";
import * as io from "socket.io-client";

type SocketContextProps = { socket: io.Socket | undefined };

const SocketContext = createContext<SocketContextProps>({
  socket: undefined,
});

export default function SocketContextProvider({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<io.Socket>();

  useEffect(() => {
    let socket = io.connect(process.env.NEXT_PUBLIC_BACKEND_URL, {
      query: {
        token: token,
      },
    });

    setSocket(socket);

    // Notifications section
    socket.on("notification", (notification: INotification) => {
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          pushNotification(notification);
        } else {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              pushNotification(notification);
            }
          });
        }
      } else {
        console.log("Notifications are not supported by this browser.");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket?.connected]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => React.useContext(SocketContext);
