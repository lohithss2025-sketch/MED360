import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";

const payments = [
  {
    invoiceId: "INV-2024-001",
    service: "Cardiology Consultation",
    doctor: "Dr. Evelyn Reed",
    date: "2024-08-15",
    amount: 1500.00,
    status: "Paid",
  },
  {
    invoiceId: "INV-2024-002",
    service: "Dermatology Follow-up",
    doctor: "Dr. Samuel Chen",
    date: "2024-08-20",
    amount: 750.00,
    status: "Pending",
  },
  {
    invoiceId: "INV-2024-003",
    service: "Pediatrics Check-up",
    doctor: "Dr. Anya Sharma",
    date: "2024-07-28",
    amount: 1200.00,
    status: "Paid",
  },
  {
    invoiceId: "INV-2024-004",
    service: "Orthopedics X-Ray",
    doctor: "Dr. Marcus Thorne",
    date: "2024-07-10",
    amount: 2500.00,
    status: "Overdue",
  },
  {
    invoiceId: "INV-2024-005",
    service: "Neurology Consultation",
    doctor: "Dr. Isabella Rossi",
    date: "2024-06-22",
    amount: 2000.00,
    status: "Paid",
  },
];

export default function Payments() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Paid":
        return "secondary";
      case "Pending":
        return "default";
      case "Overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>A record of your consultation and medical payments.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="hidden sm:table-cell">Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.invoiceId}>
                            <TableCell className="font-medium">{payment.invoiceId}</TableCell>
                            <TableCell>
                                <div>{payment.service}</div>
                                <div className="text-sm text-muted-foreground hidden sm:block">{payment.doctor}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{payment.date}</TableCell>
                            <TableCell className="hidden sm:table-cell">₹{payment.amount.toFixed(2)}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(payment.status)}>{payment.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {payment.status === 'Pending' || payment.status === 'Overdue' ? (
                                    <Button size="sm">Pay Now</Button>
                                ) : (
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Receipt
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
                Showing {payments.length} of {payments.length} payments.
            </div>
            <div className="text-lg font-semibold">
                Total Due: <span className="text-destructive">₹2500.00</span>
            </div>
        </CardFooter>
    </Card>
  );
}
