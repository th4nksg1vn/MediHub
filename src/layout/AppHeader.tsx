"use client";
import React from "react";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Patient Dashboard</div>
        <div className="flex items-center gap-3">
          {/* placeholder for profile / actions */}
          <div className="text-sm text-slate-600">Dev User</div>
        </div>
      </div>
    </header>
  );
}
