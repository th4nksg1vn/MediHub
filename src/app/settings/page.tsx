import DashboardShell from '@/components/dashboard/DashboardShell';

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings" breadcrumbs={[{ label: 'Settings', href: '/settings' }]}> 
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-700">User preferences, profile, and account settings.</p>
      </div>
    </DashboardShell>
  );
}
