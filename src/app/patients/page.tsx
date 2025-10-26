import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';

export default function PatientsPage() {
  const sample = [{ id: 'p1', name: 'John Doe' }, { id: 'p2', name: 'Jane Smith' }];
  return (
    <DashboardShell title="Patients" breadcrumbs={[{ label: 'Patients', href: '/patients' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Patients</h2>
          <ul className="mt-4 space-y-2">
            {sample.map((p) => (
              <li key={p.id} className="p-2 border rounded"><Link href={`/professional/patients/${p.id}/records`}>{p.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}
