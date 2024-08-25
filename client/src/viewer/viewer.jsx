/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import useSocket, { SocketProvider } from "../components/sockets/use-socket";
import { Box } from "@mui/material";
const SOCKET_URL = "http://localhost:5000";

function View() {
  return (
    <SocketProvider url={SOCKET_URL}>
      <Messages />
    </SocketProvider>
  );
}

function Messages() {
  const [message, setMessage] = React.useState(null);
  const socket = useSocket();

  const onReceive = (m) => {
    setMessage(m);
  };

  useEffect(() => {
    socket?.on("receive", onReceive);
    return () => {
      socket?.removeListener("receive", onReceive);
    };
  }, [socket]);

  const { type, content } = message || {};

  if (type === "title") {
    return (
      <div className="view">
        <div className="lyrics">
          <Box>{content.title}</Box>
          <Box fontSize="0.5em">{content.author}</Box>
        </div>
      </div>
    );
  }

  return (
    <div className="view">
      {content?.length > 0 && (
        <div className="lyrics">
          {content?.map?.((text) => <div key={text}>{text}</div>) ?? message}
        </div>
      )}
    </div>
  );
}

export default View;
