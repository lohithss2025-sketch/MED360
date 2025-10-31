
"use client";

import { useFirebase } from "@/firebase";
import { useEffect } from "react";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { seedAppointments } from "@/lib/seed";


export default function Home() {
  const { auth, firestore, isUserLoading, user } = useFirebase();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
    if (user && firestore) {
      seedAppointments(firestore, user.uid);
    }
  }, [isUserLoading, user, auth, firestore]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  return <DashboardClient />;
}
