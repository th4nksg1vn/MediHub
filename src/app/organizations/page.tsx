import DashboardShell from '@/components/dashboard/DashboardShell';

export default function OrganizationsPage() {
  return (
    <DashboardShell title="Organizations" breadcrumbs={[{ label: 'Organizations', href: '/organizations' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">Organizations, billing, and settings (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
