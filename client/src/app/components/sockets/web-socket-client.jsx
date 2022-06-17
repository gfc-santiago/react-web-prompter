import { useEffect} from "react";
import io from 'socket.io-client';

export default function WebSocketClient({ url, onReceive }) {

  useEffect(() => {
    const socket = io(url, {transports: ['websocket', 'polling', 'flashsocket']});
    socket.on("receive", data => {
      onReceive && onReceive(data);
    });
  }, [url, onReceive]);

  return null;
}