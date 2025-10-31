
"use client";

import React, { useState } from 'react';
import { Header } from './header';
import Appointments from './appointments';
import Medications from './medications';
import Records from './records';
import WomensHealth from './womens-health';
import Payments from './payments';
import Insurance from './insurance';
import DashboardOverview from './dashboard-overview';
import MedicalSchemes from './medical-schemes';
import FitnessAndNutrition from './fitness-and-nutrition';
import { MainNav } from './main-nav';
import Profile from './profile';
import Settings from './settings';

export type ViewType = 'dashboard' | 'appointments' | 'medications' | 'records' | 'womensHealth' | 'payments' | 'insurance' | 'medicalSchemes' | 'fitnessAndNutrition' | 'profile' | 'settings';

export function DashboardClient() {
  const [view, setView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'appointments':
        return <Appointments />;
      case 'medications':
        return <Medications />;
      case 'records':
        return <Records />;
      case 'womensHealth':
        return <WomensHealth />;
      case 'payments':
        return <Payments />;
      case 'insurance':
        return <Insurance />;
      case 'medicalSchemes':
        return <MedicalSchemes />;
      case 'fitnessAndNutrition':
        return <FitnessAndNutrition />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <DashboardOverview setView={setView} />;
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'appointments':
        return 'Appointments';
      case 'medications':
        return 'Medication History';
      case 'records':
        return 'Medical Records';
      case 'womensHealth':
        return "Women's Health";
      case 'payments':
        return 'Payment History';
      case 'insurance':
        return 'Insurance Details';
       case 'medicalSchemes':
        return 'Medical Schemes';
      case 'fitnessAndNutrition':
        return 'Fitness & Nutrition';
      case 'profile':
        return 'Profile';
      case 'settings':
        return 'Settings';
      case 'dashboard':
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={getTitle()} setView={setView} />
      <div className="border-b">
        <div className="px-4 sm:px-6 md:px-8">
            <MainNav view={view} setView={setView} />
        </div>
      </div>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
    </div>
  );
}
