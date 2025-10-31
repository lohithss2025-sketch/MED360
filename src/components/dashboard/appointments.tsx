
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, query, where, addDoc, doc, Timestamp } from "firebase/firestore";
import { MoreHorizontal, FileText } from "lucide-react";
import { useState } from "react";
import { doctors as doctorSeedData } from "@/lib/seed";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";


export default function Appointments() {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');

  const appointmentsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, "appointments"), where(`members.${user.uid}`, "==", "patient"));
  }, [firestore, user]);

  const { data: appointments, isLoading } = useCollection(appointmentsQuery);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "default";
      case "Completed":
        return "secondary";
      case "Canceled":
        return "destructive";
      default:
        return "outline";
    }
  };
  
  const handleBookAppointment = async () => {
    if (!firestore || !user || !selectedDoctor || !appointmentDate || !appointmentTime) {
        toast({
            variant: "destructive",
            title: "Booking Failed",
            description: "Please fill in all the details for the appointment.",
        });
        return;
    }

    const dateTime = new Date(`${appointmentDate}T${appointmentTime}`);

    const appointmentsCollection = collection(firestore, 'appointments');
    const newAppointment = {
        patientId: user.uid,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        doctorAvatar: selectedDoctor.avatar,
        dateTime: Timestamp.fromDate(dateTime),
        status: "Upcoming",
        notes: appointmentNotes,
        prescription: "",
        members: {
            [user.uid]: "patient",
            [selectedDoctor.id]: "doctor"
        }
    };

    addDoc(appointmentsCollection, newAppointment)
        .then((docRef) => {
            toast({
                title: "Appointment Booked!",
                description: `Your appointment with ${selectedDoctor.name} has been scheduled.`,
            });
            // Reset form
            setSelectedDoctor(null);
            setAppointmentDate('');
            setAppointmentTime('');
            setAppointmentNotes('');
        })
        .catch((error) => {
            console.error("Error booking appointment: ", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Could not book the appointment.",
            });
        });
  };

  const regularlyVisitedDoctors = doctorSeedData.filter(d => d.regular);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Book a new Appointment</CardTitle>
          <CardDescription>Select a doctor and schedule your consultation.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div>
                    <h3 className="mb-4 font-semibold">Regularly Visited</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {regularlyVisitedDoctors.map(doctor => (
                      <Dialog key={doctor.id}>
                        <Card className="flex flex-col items-center p-4 text-center">
                            <Avatar className="w-16 h-16 mb-2">
                                <AvatarImage src={doctor.avatar} alt={doctor.name} data-ai-hint="doctor person" />
                                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-bold">{doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <DialogTrigger asChild>
                                <Button className="mt-3 w-full" onClick={() => setSelectedDoctor(doctor)}>Book Now</Button>
                            </DialogTrigger>
                        </Card>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Book Appointment with {selectedDoctor?.name}</DialogTitle>
                                <DialogDescription>
                                    Please select a date and time for your appointment.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="date" className="text-right">Date</Label>
                                    <Input id="date" type="date" className="col-span-3" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="time" className="text-right">Time</Label>
                                    <Input id="time" type="time" className="col-span-3" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="notes" className="text-right">Notes</Label>
                                    <Textarea id="notes" className="col-span-3" placeholder="Reason for visit..." value={appointmentNotes} onChange={(e) => setAppointmentNotes(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleBookAppointment}>Confirm Booking</Button>
                            </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="mb-4 font-semibold">All Doctors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {doctorSeedData.map((doctor) => (
                        <Dialog key={doctor.id}>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={doctor.avatar} data-ai-hint="doctor person" />
                                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-base">{doctor.name}</CardTitle>
                                        <CardDescription>{doctor.specialty}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                     <DialogTrigger asChild>
                                        <Button variant="secondary" className="w-full" onClick={() => setSelectedDoctor(doctor)}>Book Appointment</Button>
                                    </DialogTrigger>
                                </CardContent>
                            </Card>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Book Appointment with {selectedDoctor?.name}</DialogTitle>
                                    <DialogDescription>
                                        Please select a date and time for your appointment.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="date-all" className="text-right">Date</Label>
                                        <Input id="date-all" type="date" className="col-span-3" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="time-all" className="text-right">Time</Label>
                                        <Input id="time-all" type="time" className="col-span-3" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="notes-all" className="text-right">Notes</Label>
                                        <Textarea id="notes-all" className="col-span-3" placeholder="Reason for visit..." value={appointmentNotes} onChange={(e) => setAppointmentNotes(e.target.value)} />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={handleBookAppointment}>Confirm Booking</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>View and manage your scheduled appointments.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading appointments...</TableCell>
                </TableRow>
              )}
              {!isLoading && appointments && appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={appt.doctorAvatar} alt={appt.doctorName} data-ai-hint="doctor person" />
                        <AvatarFallback>{appt.doctorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{appt.doctorName}</div>
                        <div className="text-sm text-muted-foreground">{appt.doctorSpecialty}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{(appt.dateTime as any).toDate().toLocaleDateString()}</TableCell>
                  <TableCell className="hidden md:table-cell">{(appt.dateTime as any).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(appt.status)}>{appt.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         {appt.status === 'Completed' && (
                            <Dialog>
                                <DialogTrigger asChild><DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <FileText className="mr-2 h-4 w-4"/>View Prescription
                                </DropdownMenuItem></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Prescription from {appt.doctorName}</DialogTitle>
                                        <DialogDescription>
                                            On {(appt.dateTime as any).toDate().toLocaleDateString()}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <p className="text-sm">{appt.prescription || "No prescription was provided for this appointment."}</p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                         )}
                        {appt.status === 'Upcoming' && <DropdownMenuItem>Reschedule</DropdownMenuItem>}
                        {appt.status === 'Upcoming' && <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && (!appointments || appointments.length === 0) && (
                 <TableRow>
                  <TableCell colSpan={5} className="text-center">No appointments found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
