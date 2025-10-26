import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Hospital, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/layout/AdminLayout";
import { SidebarProvider } from "@/context/SidebarContext";
import PageHeader from "@/components/ui/breadcrumbs";

export default function AdminDashboardPage() {
  // Mock data
  const systemStats = {
    totalUsers: 1250,
    totalOrganizations: 45,
    pendingVerifications: 3,
  };

  const pendingVerifications = [
    { name: "Dr. Emily Carter", role: "Cardiologist" },
    { name: "General Hospital", role: "Hospital" },
    { name: "LabCorp", role: "Laboratory" },
  ];

  return (
    <SidebarProvider>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <PageHeader
            title="Admin Dashboard"
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admin' }]}
            actions={
              <>
                <Button>Manage Users</Button>
                <Button variant="outline">System Settings</Button>
              </>
            }
          />

          {/* System Stats */}
          <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Users</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{systemStats.totalUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Organizations</CardTitle>
              <Hospital className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{systemStats.totalOrganizations}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Verifications</CardTitle>
              <UserCheck className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{systemStats.pendingVerifications}</p>
            </CardContent>
          </Card>
          </div>

          {/* Verification Queue */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Verification Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {pendingVerifications.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-semibold">{item.name}</span>
                        <Badge variant="secondary" className="ml-2">{item.role}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </SidebarProvider>
  );
}
