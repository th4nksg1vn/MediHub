import DashboardShell from '@/components/dashboard/DashboardShell';

export default function ProjectsPage() {
  return (
    <DashboardShell title="Projects" breadcrumbs={[{ label: 'Projects', href: '/projects' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">Research projects, access controls and collaborators (placeholder)</div>
      </div>
    </DashboardShell>
  );
}
