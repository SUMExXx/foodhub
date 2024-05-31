'use client';
import { Auth } from "firebase/auth";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface StateContextType {
  authentication: Auth | null;
  setAuthentication: React.Dispatch<React.SetStateAction<Auth | null>>;
  cartRefresh: boolean,
  setCartRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const StateContext = createContext<StateContextType | undefined>(undefined);

// Create a provider component
const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authentication, setAuthentication] = useState<Auth| null>(null)
  const [cartRefresh, setCartRefresh] = useState<boolean>(false)

  return (
    <StateContext.Provider value={{ authentication, setAuthentication, cartRefresh, setCartRefresh }}>
      {children}
    </StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

export { StateProvider, useStateContext };