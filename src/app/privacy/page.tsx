import DashboardShell from '@/components/dashboard/DashboardShell';

export default function PrivacyPage() {
  return (
    <DashboardShell title="Privacy" breadcrumbs={[{ label: 'Privacy', href: '/privacy' }]}> 
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-700">Privacy settings, consent management, and audit logs.</p>
      </div>
    </DashboardShell>
  );
}
