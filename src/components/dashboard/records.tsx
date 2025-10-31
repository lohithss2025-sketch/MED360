import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, FileText, Upload, Download, Eye } from "lucide-react";

const records = [
  {
    name: "Chest X-Ray",
    type: "X-Ray",
    date: "2024-07-30",
    size: "2.5 MB",
    uploadedBy: "Radiology Dept.",
  },
  {
    name: "Brain MRI",
    type: "MRI",
    date: "2024-06-15",
    size: "15.8 MB",
    uploadedBy: "Dr. Isabella Rossi",
  },
  {
    name: "Blood Test Results",
    type: "Lab Report",
    date: "2024-05-20",
    size: "800 KB",
    uploadedBy: "Central Lab",
  },
  {
    name: "Knee Arthroscopy",
    type: "Surgical Report",
    date: "2024-04-12",
    size: "1.2 MB",
    uploadedBy: "Dr. Marcus Thorne",
  },
];

export default function Records() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Medical Records</CardTitle>
          <CardDescription>Your central repository for all diagnostic reports.</CardDescription>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Report
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden sm:table-cell">Size</TableHead>
              <TableHead className="hidden lg:table-cell">Uploaded By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <div className="font-medium">{record.name}</div>
                      <Badge variant="outline" className="mt-1">{record.type}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{record.date}</TableCell>
                <TableCell className="hidden sm:table-cell">{record.size}</TableCell>
                <TableCell className="hidden lg:table-cell">{record.uploadedBy}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                      <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
