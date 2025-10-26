Dashboard components and helpers

Purpose
- Central place for dashboard-specific shells and components. Use `DashboardShell` to quickly wrap any dashboard page with the sidebar + header shell and a consistent PageHeader.

Files
- DashboardShell.tsx — wrapper that composes `SidebarProvider`, `AdminLayout`, and `PageHeader`.

Usage
import DashboardShell from '@/components/dashboard/DashboardShell'

<DashboardShell title="My Dashboard" breadcrumbs={[{label: 'Home', href: '/'}]}>
  ...page content...
</DashboardShell>
