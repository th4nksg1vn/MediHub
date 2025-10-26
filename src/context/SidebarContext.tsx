"use client";
import React, { createContext, useContext, useState } from "react";

type SidebarState = {
  isExpanded: boolean;
  isHovered: boolean;
  isMobileOpen: boolean;
  setExpanded: (v: boolean) => void;
  setHovered: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarState | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setExpanded] = useState(true);
  const [isHovered, setHovered] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        isHovered,
        isMobileOpen,
        setExpanded,
        setHovered,
        setMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
