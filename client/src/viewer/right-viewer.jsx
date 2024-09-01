import React, { useEffect } from "react";
import useSocket from "../components/sockets/use-socket";
import { Box, Typography } from "@mui/material";

export default function RightView() {
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
      <div className="view right">
        <div className="lyrics">
          <Box>{content.title}</Box>
          <Box fontSize="0.5em">{content.author}</Box>
        </div>
      </div>
    );
  }

  return (
    <div className="view right">
      {content?.length > 0 && (
        <div className="lyrics">
          {content?.map?.((text) => <Text key={text}>{text}</Text>) ?? message}
        </div>
      )}
    </div>
  );
}

function Text({ children }) {
  let fontSize = "0.8em";
  let fontWeight = undefined;
  let text = children;
  let mb = 0;
  if (children.startsWith("{S}")) {
    fontSize = "0.5em";
    fontWeight = "bold";
    text = text.substring(3);
  } else if (children.startsWith("{T}")) {
    fontSize = "0.8em";
    fontWeight = "bold";
    text = text.substring(3);
  } else if (children.startsWith("{V}")) {
    fontSize = "0.9em";
    fontWeight = "bold";
    text = text.substring(3);
    mb = 5;
  }

  return <Typography sx={{ fontSize, fontWeight, mb }}>{text}</Typography>;
}
