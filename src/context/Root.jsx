import { createContext, useState } from "react";

const RootContext = createContext();

const RootProvider = ({ children }) => {
  const [menu, setMenu] = useState("home");

  return (
    <RootContext.Provider value={{ menu, setMenu }}>
      {children}
    </RootContext.Provider>
  );
};

export { RootContext, RootProvider };
