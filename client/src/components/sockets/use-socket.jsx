import React from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext({ socket: null });

// eslint-disable-next-line react/prop-types
export function SocketProvider({ url, children }) {
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    if (!socket)
      setSocket(
        io(url, {
          transports: ["websocket", "polling", "flashsocket"],
        })
      );

    return () => {
      socket?.close();
      setSocket(null);
    };
  }, [url]);

  const value = React.useMemo(() => socket, [socket]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function withSocket(url, Component) {
  const SocketComponent = (props) => (
    <SocketProvider url={url}>
      <Component {...props} />
    </SocketProvider>
  );
  return SocketComponent;
}

export default function useSocket() {
  return React.useContext(SocketContext);
}
