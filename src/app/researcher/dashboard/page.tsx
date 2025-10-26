import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart2, History } from "lucide-react";
import AdminLayout from "@/layout/AdminLayout";
import { SidebarProvider } from "@/context/SidebarContext";
import PageHeader from "@/components/ui/breadcrumbs";

export default function ResearcherDashboardPage() {
  // Mock data
  const activeStudies = [
    { id: "S001", title: "Hypertension Trends in Urban Adults" },
    { id: "S002", title: "Impact of Diet on Glucose Levels" },
  ];

  const recentQueries = [
    { id: "Q001", description: "Patients aged 40-60 with Type 2 Diabetes" },
    { id: "Q002", description: "Correlation between BMI and blood pressure" },
  ];

  return (
    <SidebarProvider>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <PageHeader
            title="Researcher Dashboard"
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Researcher' }]}
            actions={<Button>New Study</Button>}
          />

          <div className="grid gap-8 md:grid-cols-2">
          {/* Dataset Browser and Active Studies */}
          <div className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Dataset Browser</CardTitle>
                <BarChart2 className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore anonymized patient data to build cohorts for your research.
                </p>
                <div className="flex gap-4">
                  <div className="p-4 border rounded-lg flex-1">
                    <p className="text-2xl font-bold">10,000+</p>
                    <p className="text-sm text-muted-foreground">Patient Records</p>
                  </div>
                  <div className="p-4 border rounded-lg flex-1">
                    <p className="text-2xl font-bold">50+</p>
                    <p className="text-sm text-muted-foreground">Data Points</p>
                  </div>
                </div>
                <Button className="mt-4 w-full">Explore Data</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Studies</CardTitle>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {activeStudies.map((study) => (
                    <li key={study.id} className="flex justify-between items-center p-2 border rounded-md">
                      <span>{study.title}</span>
                      <Button variant="secondary" size="sm">View</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recent Queries */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Queries</CardTitle>
                <History className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentQueries.map((query) => (
                    <li key={query.id} className="text-sm text-muted-foreground p-2 border-b">
                      {query.description}
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
