import React from 'react';
import { SidebarProvider } from '@/context/SidebarContext';
import AdminLayout from '@/layout/AdminLayout';

export default function HospitalDashboardPage() {
  return (
    <SidebarProvider>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Hospital Profile */}
          <section className="bg-linear-to-br from-sky-500 to-blue-700 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Central Medical Hospital</h2>
                <p className="text-blue-100 mb-4">123 Healthcare Avenue, Medical District, City 12345</p>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="text-sm text-blue-100">Emergency Care</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">15+</p>
                    <p className="text-sm text-blue-100">Departments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-sm text-blue-100">Bed Capacity</p>
                  </div>
                </div>
              </div>

              <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 8h3m-3 4h3m-3 4h3m6-4h.01M17 16h.01"></path></svg>
              </div>
            </div>
          </section>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Professionals</h3>
              <p className="text-3xl font-bold text-blue-600">245</p>
              <p className="text-sm text-gray-500 mt-1">+12 this month</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Patients</h3>
              <p className="text-3xl font-bold text-green-600">1,847</p>
              <p className="text-sm text-gray-500 mt-1">+89 this week</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-md flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Today's Appointments</h3>
              <p className="text-3xl font-bold text-yellow-600">127</p>
              <p className="text-sm text-gray-500 mt-1">18 pending</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Bed Occupancy</h3>
              <p className="text-3xl font-bold text-purple-600">78%</p>
              <p className="text-sm text-gray-500 mt-1">392 of 500 beds</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 shadow" style={{ minHeight: 300 }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Visits (Last 7 Days)</h3>
              <div className="w-full h-60 bg-gray-50 rounded-md flex items-center justify-center text-sm text-gray-400">Chart placeholder</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow" style={{ minHeight: 300 }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
              <div className="w-full h-60 bg-gray-50 rounded-md flex items-center justify-center text-sm text-gray-400">Chart placeholder</div>
            </div>
          </div>

          {/* Staff & Patients */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Medical Staff</h3>
                <a className="text-blue-600 hover:text-blue-500 text-sm font-medium" href="#">View All</a>
              </div>
              <div className="space-y-4">
                {/* Staff item example */}
                <div className="p-4 rounded-md shadow-sm flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Dr. Michael Chen</h4>
                      <p className="text-sm text-gray-500">Cardiologist</p>
                      <p className="text-xs text-gray-400">Ext: 2341</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">Available</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
                <a className="text-blue-600 hover:text-blue-500 text-sm font-medium" href="#">View All</a>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-md shadow-sm flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">John Anderson</h4>
                      <p className="text-sm text-gray-500">ID: P-2024-001</p>
                      <p className="text-xs text-gray-400">Last visit: Today, 2:30 PM</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-50 text-green-800">Stable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </SidebarProvider>
  );
}
