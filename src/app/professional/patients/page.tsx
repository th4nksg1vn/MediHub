import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus } from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/layout/AdminLayout";
import { SidebarProvider } from "@/context/SidebarContext";
import PageHeader from "@/components/ui/breadcrumbs";

export default function PatientListPage() {
  // Mock data for the patient list
  const patients = [
    { id: "P001", name: "John Doe", age: 45, condition: "Hypertension", status: "Stable" },
    { id: "P002", name: "Jane Smith", age: 62, condition: "Diabetes Type 2", status: "Needs Follow-up" },
    { id: "P003", name: "Peter Jones", age: 35, condition: "Asthma", status: "Stable" },
    { id: "P004", name: "Alice Williams", age: 55, condition: "High Cholesterol", status: "Critical" },
    { id: "P005", name: "Bob Brown", age: 70, condition: "COPD", status: "Stable" },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Critical":
        return "destructive";
      case "Needs Follow-up":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <SidebarProvider>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <PageHeader
            title="My Patients"
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Patients' }]}
            actions={<Button><UserPlus className="h-4 w-4 mr-2" />Add New Patient</Button>}
          />

          <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>All Patients</CardTitle>
              <div className="flex items-center gap-2 w-full max-w-sm">
                <Input placeholder="Search patients..." />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Primary Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(patient.status) as any}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/professional/patients/${patient.id}/records`}>
                        <Button variant="outline" size="sm">
                          View Record
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      </AdminLayout>
    </SidebarProvider>
  );
}
