import React from 'react';
import WebSocketClient from '../components/sockets/web-socket-client';
import usePrompter from './prompter';
const SOCKET_URL = 'http://localhost:5000';

function View() {

  const [message, setMessage] = React.useState({});
  const [loading, data] = usePrompter({url: SOCKET_URL});

  React.useEffect(() => {
    if (data) {
      setMessage(data.message);
    } 
  }, [data]);

  function onReceive(msg) {
    setMessage(msg);
  }

  return (
    <div className="view">
      { message.text || (loading && 'Loading ...') }
      <WebSocketClient url={SOCKET_URL} onReceive={onReceive} />
    </div>
  );
}

export default View;
