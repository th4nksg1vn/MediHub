"use client";

import DashboardLayout from "../../components/DashboardLayout";

export default function IndividualDashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Health Metrics Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* Add icon here */}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Health Score
                  </dt>
                  <dd className="text-lg font-medium text-slate-900">85/100</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-sky-700 hover:text-sky-900">
                View details
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-slate-900">Recent Activity</h3>
            <div className="mt-4 flow-root">
              <ul role="list" className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center ring-8 ring-white">
                          {/* Add icon here */}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-slate-500">
                            Completed daily health check
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-slate-500">
                          2h ago
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-slate-900">AI Health Assistant</h3>
            <div className="mt-4">
              <p className="text-sm text-slate-500">
                Ask me anything about your health data or get personalized recommendations.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-slate-900">Health Trends</h2>
        <div className="mt-4 bg-white shadow rounded-lg p-6">
          {/* Add charts/graphs here */}
          <p className="text-sm text-slate-500">Visualizations coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}