
import { collection, doc, Firestore, setDoc, Timestamp, getDocs, query, where } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export const doctors = [
    {
        id: "doc-kumar",
        name: "Dr. Rajesh Kumar",
        specialty: "Cardiology",
        avatar: "https://picsum.photos/seed/1/128/128",
        regular: true,
    },
    {
        id: "doc-chen",
        name: "Dr. Priya Chen",
        specialty: "Dermatology",
        avatar: "https://picsum.photos/seed/2/128/128",
        regular: false,
    },
    {
        id: "doc-sharma",
        name: "Dr. Anya Sharma",
        specialty: "Pediatrics",
        avatar: "https://picsum.photos/seed/3/128/128",
        regular: true,
    },
    {
        id: "doc-singh",
        name: "Dr. Arjun Singh",
        specialty: "Orthopedics",
        avatar: "https://picsum.photos/seed/4/128/128",
        regular: false,
    },
    {
        id: "doc-rao",
        name: "Dr. Isabella Rao",
        specialty: "Neurology",
        avatar: "https://picsum.photos/seed/5/128/128",
        regular: false,
    },
    {
        id: "doc-gupta",
        name: "Dr. Sunil Gupta",
        specialty: "General Physician",
        avatar: "https://picsum.photos/seed/6/128/128",
        regular: true,
    }
];

const appointmentsData = [
  {
    doctorName: "Dr. Rajesh Kumar",
    doctorSpecialty: "Cardiology",
    doctorAvatar: "https://picsum.photos/seed/1/40/40",
    dateTime: new Date("2024-08-15T10:30:00"),
    status: "Upcoming",
    prescription: "Take Lisinopril 10mg once daily. Follow up in 1 month."
  },
  {
    doctorName: "Dr. Priya Chen",
    doctorSpecialty: "Dermatology",
    doctorAvatar: "https://picsum.photos/seed/2/40/40",
    dateTime: new Date("2024-08-20T14:00:00"),
    status: "Upcoming",
    prescription: ""
  },
  {
    doctorName: "Dr. Anya Sharma",
    doctorSpecialty: "Pediatrics",
    doctorAvatar: "https://picsum.photos/seed/3/40/40",
    dateTime: new Date("2024-07-28T11:00:00"),
    status: "Completed",
    prescription: "Administer Paracetamol syrup for fever as needed. Ensure adequate hydration."
  },
  {
    doctorName: "Dr. Arjun Singh",
    doctorSpecialty: "Orthopedics",
    doctorAvatar: "https://picsum.photos/seed/4/40/40",
    dateTime: new Date("2024-07-10T09:00:00"),
    status: "Completed",
    prescription: "Rest the affected knee for 1 week. Apply ice packs for 15 minutes, 3 times a day. Ibuprofen if pain persists."
  },
  {
    doctorName: "Dr. Isabella Rao",
    doctorSpecialty: "Neurology",
    doctorAvatar: "https://picsum.photos/seed/5/40/40",
    dateTime: new Date("2024-06-22T15:45:00"),
    status: "Canceled",
    prescription: ""
  },
];

export async function seedAppointments(firestore: Firestore, userId: string) {
    const appointmentsCollection = collection(firestore, 'appointments');

    try {
        const q = query(appointmentsCollection, where(`members.${userId}`, '==', 'patient'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // Data already seeded
            return;
        }

        const promises = appointmentsData.map(async (appt) => {
            const docRef = doc(appointmentsCollection);
            const id = docRef.id;
            const patientId = `patient-${userId.substring(0, 5)}`;
            const doctor = doctors.find(d => d.name === appt.doctorName);
            const doctorId = doctor ? doctor.id : `doc-${appt.doctorName.split(' ')[1].toLowerCase()}`;

            const appointmentData = {
                id,
                patientId,
                doctorId,
                doctorName: appt.doctorName,
                doctorSpecialty: appt.doctorSpecialty,
                doctorAvatar: appt.doctorAvatar,
                dateTime: Timestamp.fromDate(appt.dateTime),
                status: appt.status,
                notes: "",
                prescription: appt.prescription,
                members: {
                    [userId]: "patient",
                    [doctorId]: "doctor"
                }
            };

            setDoc(docRef, appointmentData).catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'create',
                    requestResourceData: appointmentData,
                });
                errorEmitter.emit('permission-error', permissionError);
            });
        });

        await Promise.all(promises);

    } catch (error: any) {
        if (error.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: appointmentsCollection.path,
                operation: 'list',
            });
            errorEmitter.emit('permission-error', permissionError);
        } else {
            console.error("An unexpected error occurred during seeding:", error);
        }
    }
}

    