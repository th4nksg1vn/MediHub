import DashboardShell from '@/components/dashboard/DashboardShell';

export default function RecordsPage() {
  return (
    <DashboardShell title="My Health — Records" breadcrumbs={[{ label: 'My Health', href: '/records' }]}> 
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-700">Placeholder for records: list of measurements, uploaded files, and notes.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-white p-4 shadow-sm">Recent Measurements</div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">Uploaded Documents</div>
        </div>
      </div>
    </DashboardShell>
  );
}
