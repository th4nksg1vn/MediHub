"use client";
import React from "react";
import { useSidebar } from "@/context/SidebarContext";

export default function Backdrop() {
  const { isMobileOpen, setMobileOpen } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-10 bg-black/40"
      onClick={() => setMobileOpen(false)}
    />
  );
}
