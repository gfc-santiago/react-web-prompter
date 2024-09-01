import React, { useEffect, useMemo, useState } from "react";

const ServiceContext = React.createContext({ loading: false, service: null });

function convert(file) {
  const service = {
    sections: [],
  };
  const lines = file.split("\r\n");
  let section = null;
  let subSection = null;
  let page = [];
  lines.forEach((line) => {
    if (line.startsWith("##")) {
      // end page
      if (page.length > 0) {
        if (subSection) {
          subSection.lines.push(page);
        } else {
          section.lines.push(page);
        }
        page = [];
      }

      // process subSection
      if (subSection) section?.lines?.push?.(subSection);
      subSection = { name: line.substring(2), lines: [] };
      return;
    } else if (line.startsWith("#")) {
      // end page
      if (page.length > 0) {
        if (subSection) {
          subSection.lines.push(page);
        } else {
          section.lines.push(page);
        }
        page = [];
      }

      // end subsection
      if (subSection) {
        section?.lines?.push?.(subSection);
        subSection = null;
      }

      if (section) service.sections.push(section);
      section = { name: line.substring(1), lines: [] };
      return;
    } else if (line === "") {
      // end page
      if (page.length > 0) {
        if (subSection) {
          subSection.lines.push(page);
        } else {
          section.lines.push(page);
        }
        page = [];
      }
      return;
    }

    page.push(line);
  });

  if (page.length > 0) {
    if (subSection) {
      subSection.lines.push(page);
    } else {
      section.lines.push(page);
    }
    page = [];
  }

  if (subSection) {
    section?.lines?.push?.(subSection);
  }
  if (section) {
    service.sections.push(section);
  }

  return service;
}

// eslint-disable-next-line react/prop-types
export function ServiceProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/public/service/service.txt")
      .then((res) => res.text())
      .then((contents) => setService(convert(contents)))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo(
    () => ({
      loading,
      service,
    }),
    [loading, service]
  );
  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useService() {
  return React.useContext(ServiceContext);
}
