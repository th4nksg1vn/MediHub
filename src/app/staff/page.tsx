import DashboardShell from '@/components/dashboard/DashboardShell';

export default function StaffPage() {
  return (
    <DashboardShell title="Personnel" breadcrumbs={[{ label: 'Personnel', href: '/staff' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">Staff directory and role management (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
