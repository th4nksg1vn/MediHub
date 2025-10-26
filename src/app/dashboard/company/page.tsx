"use client";

import DashboardLayout from "../../components/DashboardLayout";

export default function CompanyDashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Member Statistics Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* Add icon here */}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Total Members
                  </dt>
                  <dd className="text-lg font-medium text-slate-900">567</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-sky-700 hover:text-sky-900">
                View all members
              </a>
            </div>
          </div>
        </div>

        {/* Wellness Program Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-slate-900">Wellness Programs</h3>
            <div className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Mental Health Week</p>
                    <p className="text-sm text-slate-500">Starting next Monday</p>
                  </div>
                  <button className="text-sm text-sky-600 hover:text-sky-900">
                    View Details
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Fitness Challenge</p>
                    <p className="text-sm text-slate-500">Ongoing - 45 participants</p>
                  </div>
                  <button className="text-sm text-sky-600 hover:text-sky-900">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Partnerships Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-slate-900">Research Partnerships</h3>
            <div className="mt-4">
              <p className="text-sm text-slate-500">
                Participate in health research studies and gain valuable insights.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
                >
                  Explore Studies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-slate-900">Organization Health Analytics</h2>
        <div className="mt-4 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Wellness Participation</h3>
              <p className="mt-2 text-sm text-slate-500">Chart coming soon...</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Health Risk Assessment</h3>
              <p className="mt-2 text-sm text-slate-500">Chart coming soon...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Management Tools */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-slate-900">Management Tools</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200">
                Invite Members
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200">
                Schedule Program
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200">
                View Reports
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200">
                Manage Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}