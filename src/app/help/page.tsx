import DashboardShell from '@/components/dashboard/DashboardShell';

export default function HelpPage() {
  return (
    <DashboardShell title="Help" breadcrumbs={[{ label: 'Help', href: '/help' }]}> 
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-700">Help center articles, contact support, and FAQs.</p>
      </div>
    </DashboardShell>
  );
}
