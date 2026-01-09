"use client";

import React, { createContext, useState } from "react";

const SidebarContext = createContext({
  open: false,
  setOpen: () => {},
});

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarContext;

