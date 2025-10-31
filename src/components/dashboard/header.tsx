
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Bell, HeartPulse } from 'lucide-react';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ViewType } from './dashboard-client';

interface HeaderProps {
  title: string;
  setView?: (view: ViewType) => void;
}

export function Header({ title, setView }: HeaderProps) {
    const patientAvatar = PlaceHolderImages.find(p => p.id === 'patient-avatar');

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-8">
            <div className="flex items-center gap-2">
                <HeartPulse className="w-8 h-8 text-primary" />
                <h1 className="font-headline text-xl font-semibold">Med360</h1>
            </div>

            <div className="ml-auto flex items-center gap-2 md:gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." className="pl-9 w-[200px] lg:w-[300px] rounded-full bg-white dark:bg-card" />
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                            <Avatar className="h-9 w-9">
                                {patientAvatar && <AvatarImage src={patientAvatar.imageUrl} alt="Patient Avatar" data-ai-hint={patientAvatar.imageHint}/>}
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="font-semibold">Anjali Devi</div>
                            <div className="text-xs text-muted-foreground">Patient ID: M360-12345</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setView && setView('profile')}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView && setView('settings')}>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
