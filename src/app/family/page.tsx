import DashboardShell from '@/components/dashboard/DashboardShell';

export default function FamilyPage() {
  return (
    <DashboardShell title="Family" breadcrumbs={[{ label: 'Family', href: '/family' }]}> 
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-700">Family members and shared records will appear here.</p>
      </div>
    </DashboardShell>
  );
}
