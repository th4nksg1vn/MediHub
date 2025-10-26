"use client";
import Link from "next/link";
import DashboardLayout from "@/app/components/DashboardLayout";
import HealthTrendsChart from "@/app/components/HealthTrendsChart";
import { useRoleStore } from "@/store/useRoleStore";

export default function IndividualOnboarding() {
  const { user } = useRoleStore();

  // Sample trend data (replace with real fetch later)
  const trendData = [
    { x: 1, y: 72 },
    { x: 2, y: 75 },
    { x: 3, y: 73 },
    { x: 4, y: 70 },
    { x: 5, y: 68 },
    { x: 6, y: 69 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome{user?.full_name ? `, ${user.full_name}` : ''}</h1>
            <p className="text-sm text-slate-600">Your personal health dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/health-checkin"
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
            >
              Start check-in
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="text-sm text-slate-500">Last check-in</h3>
            <p className="mt-2 text-lg font-medium">2 days ago</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="text-sm text-slate-500">Avg heart rate</h3>
            <p className="mt-2 text-lg font-medium">72 bpm</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="text-sm text-slate-500">Active minutes (week)</h3>
            <p className="mt-2 text-lg font-medium">145 min</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Health trends</h2>
            <p className="text-sm text-slate-500">Recent vitals and trends</p>
            <div className="mt-4">
              <HealthTrendsChart data={trendData} />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              <li>Checked in — 2 days ago</li>
              <li>Medication logged — 5 days ago</li>
              <li>Profile updated — 2 weeks ago</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
