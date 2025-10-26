import HealthTrendsChart from "@/app/components/HealthTrendsChart";
import AIChat from "@/app/components/AIChat";
import Notifications from "@/app/components/Notifications";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const runtime = "edge";

export default function DevIndividualDashboard() {
  // Protect this route in production
  if (process.env.NODE_ENV === 'production') {
    return <div className="p-8">Not available in production.</div>;
  }

  const sampleData = [
    { x: "Day 1", y: 120 },
    { x: "Day 2", y: 125 },
    { x: "Day 3", y: 130 },
    { x: "Day 4", y: 128 },
    { x: "Day 5", y: 135 },
  ];

  const notifications = [
    { id: "n1", message: "Possible elevated BP trend detected" },
    { id: "n2", message: "Time for your weekly check-in" },
  ];

  const content = (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div>
        {/* Main content */}
        <main>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Individual — Dev Dashboard</h1>
              <p className="text-sm text-slate-600">Design & iterate on the individual patient dashboard (dev only)</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-xs text-slate-500">Heart Rate</div>
              <div className="mt-2 text-3xl font-bold">72</div>
              <div className="text-sm text-slate-500">bpm</div>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-xs text-slate-500">Blood Pressure</div>
              <div className="mt-2 text-3xl font-bold">128/82</div>
              <div className="text-sm text-slate-500">mmHg</div>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="text-xs text-slate-500">Temperature</div>
              <div className="mt-2 text-3xl font-bold">36.7°C</div>
              <div className="text-sm text-slate-500">core</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="text-lg font-medium">Health Trends</h2>
              <div className="mt-4">
                <HealthTrendsChart data={sampleData} />
              </div>
            </div>

            <aside className="rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-md font-medium">Notifications</h3>
              <div className="mt-3 space-y-2">
                <Notifications items={notifications} />
              </div>
            </aside>
          </div>

          <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="text-lg font-medium">AI Assistant</h2>
            <div className="mt-4">
              <AIChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
  return (
    <DashboardShell title="Individual — Dev Dashboard" breadcrumbs={[{ label: 'Dev', href: '/dev' }, { label: 'Individual' }]}>
      {content}
    </DashboardShell>
  );
}
