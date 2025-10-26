import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import AdminLayout from "@/layout/AdminLayout";
import { SidebarProvider } from "@/context/SidebarContext";
import PageHeader from "@/components/ui/breadcrumbs";

export default function PatientRecordsPage({ params }: { params: { patientId: string } }) {
  // Mock data for a single patient
  const patient = {
    id: params.patientId,
    name: "John Doe",
    age: 45,
    condition: "Hypertension",
  };

  const clinicalNotes = [
    { date: "2025-10-26", note: "Patient reports consistent headaches. BP is 140/90. Advised lifestyle changes.", author: "Dr. Smith" },
    { date: "2025-09-15", note: "Follow-up on medication. Patient is responding well.", author: "Dr. Smith" },
  ];

  const labResults = [
    { date: "2025-10-20", test: "Lipid Panel", result: "Total Chol: 210 mg/dL", status: "High" },
    { date: "2025-10-20", test: "A1C", result: "5.5%", status: "Normal" },
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    { name: "Amlodipine", dosage: "5mg", frequency: "Once daily" },
  ];

  return (
    <SidebarProvider>
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <PageHeader
            title={`Patient Record: ${patient.name}`}
            subtitle={`ID: ${patient.id} — ${patient.age} years old — ${patient.condition}`}
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Patients', href: '/professional/patients' }, { label: patient.name }]}
            actions={<Button><FileText className="h-4 w-4 mr-2" />Add New Record</Button>}
          />

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="notes">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
                <TabsTrigger value="labs">Lab Results</TabsTrigger>
                <TabsTrigger value="meds">Medications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="notes" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Author</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clinicalNotes.map((note, index) => (
                      <TableRow key={index}>
                        <TableCell>{note.date}</TableCell>
                        <TableCell>{note.note}</TableCell>
                        <TableCell>{note.author}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="labs" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labResults.map((lab, index) => (
                      <TableRow key={index}>
                        <TableCell>{lab.date}</TableCell>
                        <TableCell>{lab.test}</TableCell>
                        <TableCell>{lab.result}</TableCell>
                        <TableCell>
                          <Badge variant={lab.status === 'High' ? 'destructive' : 'secondary'}>
                            {lab.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="meds" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medications.map((med, index) => (
                      <TableRow key={index}>
                        <TableCell>{med.name}</TableCell>
                        <TableCell>{med.dosage}</TableCell>
                        <TableCell>{med.frequency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </SidebarProvider>
  );
}
