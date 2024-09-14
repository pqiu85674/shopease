import React from "react";

const CollapsedContext = React.createContext();

export function CollapsedProvider({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </CollapsedContext.Provider>
  );
}

export default CollapsedContext;
