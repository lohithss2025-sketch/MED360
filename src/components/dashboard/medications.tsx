import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Pill, AlertCircle, Clock } from "lucide-react";

const medications = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once a day",
    purpose: "High Blood Pressure",
    refillStatus: "Refill due in 5 days",
    status: "Active",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice a day",
    purpose: "Type 2 Diabetes",
    refillStatus: "15 days remaining",
    status: "Active",
  },
  {
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once a day",
    purpose: "High Cholesterol",
    refillStatus: "20 days remaining",
    status: "Active",
  },
  {
    name: "Amoxicillin",
    dosage: "500mg",
    frequency: "Every 8 hours for 7 days",
    purpose: "Bacterial Infection",
    refillStatus: "Not applicable",
    status: "Finished",
  },
];

export default function Medications() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Medication History</CardTitle>
                    <CardDescription>A record of your current and past prescriptions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {medications.map((med, index) => (
                            <Card key={index} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Pill className="h-5 w-5 text-primary" />
                                                {med.name}
                                            </CardTitle>
                                            <CardDescription>{med.dosage}</CardDescription>
                                        </div>
                                        <Badge variant={med.status === 'Active' ? 'default' : 'outline'}>{med.status}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground">{med.purpose}</p>
                                    <p className="text-sm font-medium mt-2">{med.frequency}</p>
                                </CardContent>
                                <CardFooter className="bg-muted/50 p-3 mt-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        {med.refillStatus.includes('due') ? <AlertCircle className="h-4 w-4 text-destructive" /> : <Clock className="h-4 w-4" />}
                                        <span>{med.refillStatus}</span>
                                    </div>
                                    {med.status === 'Active' && <Button variant="outline" size="sm" className="ml-auto">Request Refill</Button>}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
