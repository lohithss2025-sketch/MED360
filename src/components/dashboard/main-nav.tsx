
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  CalendarDays,
  Pill,
  FileScan,
  Baby,
  CreditCard,
  Shield,
  BookHeart,
  Dumbbell,
  User,
  Settings,
} from 'lucide-react';
import type { ViewType } from './dashboard-client';

interface MainNavProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  className?: string;
}

export function MainNav({ view, setView, className }: MainNavProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'records', label: 'Records', icon: FileScan },
    { id: 'womensHealth', label: "Women's Health", icon: Baby },
    { id: 'fitnessAndNutrition', label: 'Fitness & Nutrition', icon: Dumbbell },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'medicalSchemes', label: 'Medical Schemes', icon: BookHeart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6 overflow-x-auto pb-2', className)}
    >
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as ViewType)}
          className={cn(
            'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary whitespace-nowrap px-3 py-2 rounded-md',
            view === item.id
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          )}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </button>
      ))}
    </nav>
  );
}
