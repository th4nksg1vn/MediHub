"use client";
import React from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import AdminLayout from "@/layout/AdminLayout";
import PageHeader from "@/components/ui/breadcrumbs";

export default function DashboardShell({
  title,
  subtitle,
  breadcrumbs,
  actions,
  children,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {title && (
            <PageHeader
              title={title}
              subtitle={subtitle}
              breadcrumbs={breadcrumbs}
              actions={actions}
            />
          )}
          {children}
        </div>
      </AdminLayout>
    </SidebarProvider>
  );
}
