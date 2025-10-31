"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Calendar, Pill, FileText, Activity, User, Droplets, UserCheck } from 'lucide-react';
import type { ViewType } from './dashboard-client';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const chartData = [
  { month: "January", steps: 18600 },
  { month: "February", steps: 30500 },
  { month: "March", steps: 23700 },
  { month: "April", steps: 7300 },
  { month: "May", steps: 20900 },
  { month: "June", steps: 21400 },
]

const chartConfig = {
  steps: {
    label: "Steps",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

interface DashboardOverviewProps {
  setView: (view: ViewType) => void;
}

export default function DashboardOverview({ setView }: DashboardOverviewProps) {
  const patientAvatar = PlaceHolderImages.find(p => p.id === 'patient-avatar');
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
                {patientAvatar && <AvatarImage src={patientAvatar.imageUrl} alt="Patient Avatar" data-ai-hint={patientAvatar.imageHint}/>}
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-2xl font-headline">Welcome, Anjali Devi!</CardTitle>
                <CardDescription>Here's a summary of your health dashboard.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
             <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border p-4">
                    <UserCheck className="h-6 w-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Patient ID</p>
                        <p className="font-semibold">MED360-0001</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 rounded-lg border p-4">
                    <User className="h-6 w-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold">Anjali Devi</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                    <Droplets className="h-6 w-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Blood Group</p>
                        <p className="font-semibold">O+</p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">Dr. Evelyn Reed</div>
            <p className="text-xs text-muted-foreground">August 15, 2024 at 10:30 AM</p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto" onClick={() => setView('appointments')}>
              View all appointments <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">3 Medications</div>
            <p className="text-xs text-muted-foreground">Next dose: Lisinopril at 8:00 PM</p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto" onClick={() => setView('medications')}>
              View medication history <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">1 New Report</div>
            <p className="text-xs text-muted-foreground">Chest X-Ray from July 30, 2024</p>
          </CardContent>
           <CardFooter>
            <Button variant="link" className="p-0 h-auto" onClick={() => setView('records')}>
              View all records <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
          <CardDescription>Your step count over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[250px]">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="steps"
                  type="natural"
                  fill="var(--color-steps)"
                  fillOpacity={0.4}
                  stroke="var(--color-steps)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
