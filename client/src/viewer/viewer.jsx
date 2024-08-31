import React, { useEffect } from "react";
import useSocket from "../components/sockets/use-socket";
import { Box } from "@mui/material";

export default function View() {
  const [message, setMessage] = React.useState(null);
  const socket = useSocket();

  const onReceive = (m) => {
    console.log("received");
    setMessage(m);
  };

  useEffect(() => {
    socket?.on?.("receive", onReceive);
    return () => {
      socket?.removeListener?.("receive", onReceive);
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
