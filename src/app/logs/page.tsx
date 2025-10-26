import DashboardShell from '@/components/dashboard/DashboardShell';

export default function LogsPage() {
  return (
    <DashboardShell title="Logs" breadcrumbs={[{ label: 'Logs', href: '/logs' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">System logs and audit trail viewer (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
