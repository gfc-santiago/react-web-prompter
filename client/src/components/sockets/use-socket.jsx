/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { io } from "socket.io-client";
import useConfig from "../config/use-config";

const SocketContext = React.createContext(null);
localStorage.debug = "*";

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { host } = useConfig();

  React.useEffect(() => {
    setSocket((prev) => {
      if (prev) prev?.close();
      const socket = io(host, {
        transports: ["websocket", "polling"],
      });

      socket.on("error", (err) => {
        console.log(`error due to ${err.message}`);
      });
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
      socket.send = (payload) => {
        socket.emit("receive", payload);
      };
      return socket;
    });

    return () => {
      setSocket((prev) => {
        prev?.close();
        return null;
      });
    };
  }, [host, setSocket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  const context = React.useContext(SocketContext);
  return context;
}
