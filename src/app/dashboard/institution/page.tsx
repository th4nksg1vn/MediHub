"use client";

import DashboardLayout from "../../components/DashboardLayout";

export default function InstitutionDashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Patient Statistics Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* Add icon here */}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    Total Patients
                  </dt>
                  <dd className="text-lg font-medium text-slate-900">1,234</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-sky-700 hover:text-sky-900">
                View all patients
              </a>
            </div>
          </div>
        </div>

        {/* Recent Admissions Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-slate-900">Recent Admissions</h3>
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
                            New patient admitted to Ward A
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-slate-500">
                          30m ago
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Staff Management Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-slate-900">Staff Management</h3>
            <div className="mt-4">
              <p className="text-sm text-slate-500">
                Manage roles and permissions for your medical staff.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
                >
                  Manage Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-slate-900">Institution Analytics</h2>
        <div className="mt-4 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add charts/graphs here */}
            <div>
              <h3 className="text-sm font-medium text-slate-500">Patient Demographics</h3>
              <p className="mt-2 text-sm text-slate-500">Chart coming soon...</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Treatment Outcomes</h3>
              <p className="mt-2 text-sm text-slate-500">Chart coming soon...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-slate-900">Quick Actions</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200">
                Add New Patient
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200">
                Schedule Appointment
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200">
                Generate Reports
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200">
                Access Lab Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}