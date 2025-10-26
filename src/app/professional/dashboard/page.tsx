import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar, UserPlus, Search } from "lucide-react";
import AdminLayout from "@/layout/AdminLayout";
import { SidebarProvider } from "@/context/SidebarContext";
import PageHeader from "@/components/ui/breadcrumbs";

export default function ProfessionalDashboardPage() {
  // Mock data - in a real app, this would come from an API
  const upcomingAppointments = [
    { time: "09:00 AM", patient: "John Doe", reason: "Follow-up" },
    { time: "10:00 AM", patient: "Jane Smith", reason: "Annual Check-up" },
    { time: "11:30 AM", patient: "Peter Jones", reason: "Test Results" },
  ];

  const patientAlerts = [
    { patient: "Alice Williams", alert: "High blood pressure reading" },
    { patient: "Bob Brown", alert: "Medication refill request" },
  ];

  return (
    <SidebarProvider>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <PageHeader
            title="Professional Dashboard"
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Professional' }]}
            actions={
              <>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-6 w-6" />
                </Button>
              </>
            }
          />

          <div className="grid gap-8 md:grid-cols-3">
          {/* Main Content: Patient Search and Alerts */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Patient Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search by name or ID..." />
                  <Button>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Critical Patient Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {patientAlerts.map((alert, index) => (
                    <li key={index} className="flex items-center justify-between p-2 rounded-md bg-red-50 border border-red-200">
                      <div>
                        <p className="font-semibold">{alert.patient}</p>
                        <p className="text-sm text-red-700">{alert.alert}</p>
                      </div>
                      <Button variant="secondary" size="sm">View Chart</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Today's Schedule */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Today's Schedule</CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {upcomingAppointments.map((appt, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{appt.patient.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{appt.patient}</p>
                        <p className="text-sm text-muted-foreground">{appt.time} - {appt.reason}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </AdminLayout>
    </SidebarProvider>
  );
}
