import DashboardShell from '@/components/dashboard/DashboardShell';

export default function DatasetsPage() {
  return (
    <DashboardShell title="Datasets" breadcrumbs={[{ label: 'Datasets', href: '/datasets' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">Dataset list and ingestion controls (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
