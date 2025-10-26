import DashboardShell from '@/components/dashboard/DashboardShell';

export default function SharingPage() {
  return (
    <DashboardShell title="Data Sharing" breadcrumbs={[{ label: 'Data Sharing', href: '/sharing' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">Data sharing agreements and endpoints (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
