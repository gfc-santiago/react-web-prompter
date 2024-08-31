import React from "react";

const ConfigContext = React.createContext({ config: { host: null } });

// eslint-disable-next-line react/prop-types
export function ConfigProvider({ children }) {
  const value = React.useMemo(() => {
    const url = new URL(window.location.href);
    url.port = 5000;
    // url.protocol = "ws";
    return { host: url.origin };
  }, []);

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useConfig() {
  return React.useContext(ConfigContext);
}
