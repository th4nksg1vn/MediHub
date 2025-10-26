import DashboardShell from '@/components/dashboard/DashboardShell';

export default function SqlPage() {
  return (
    <DashboardShell title="SQL Studio" breadcrumbs={[{ label: 'SQL Studio', href: '/sql' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">Ad-hoc query editor and recent queries (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
