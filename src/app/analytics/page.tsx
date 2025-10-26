import DashboardShell from '@/components/dashboard/DashboardShell';
import HealthTrendsChart from '@/app/components/HealthTrendsChart';

const sampleData = [
  { x: 'Day 1', y: 120 },
  { x: 'Day 2', y: 125 },
  { x: 'Day 3', y: 130 },
];

export default function AnalyticsPage() {
  return (
    <DashboardShell title="Analytics" breadcrumbs={[{ label: 'Analytics', href: '/analytics' }]}> 
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Health Trends</h2>
          <div className="mt-4"><HealthTrendsChart data={sampleData} /></div>
        </div>
      </div>
    </DashboardShell>
  );
}
