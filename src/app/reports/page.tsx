import DashboardShell from '@/components/dashboard/DashboardShell';

export default function ReportsPage() {
  return (
    <DashboardShell title="Reports" breadcrumbs={[{ label: 'Reports', href: '/reports' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">Reporting, exports, and scheduled reports (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
