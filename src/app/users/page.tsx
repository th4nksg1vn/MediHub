import DashboardShell from '@/components/dashboard/DashboardShell';

export default function UsersPage() {
  return (
    <DashboardShell title="Users" breadcrumbs={[{ label: 'Users', href: '/users' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">User management and roles (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
