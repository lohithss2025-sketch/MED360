"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Scale, Baby, Calendar, Droplets, Droplet } from "lucide-react";
import { Button } from "../ui/button";

const healthMetrics = [
  { label: "Heart Rate", value: "72 bpm", icon: Heart, color: "text-red-500" },
  { label: "Weight", value: "65.8 kg", icon: Scale, color: "text-blue-500" },
  { label: "Blood Pressure", value: "120/80 mmHg", icon: Droplets, color: "text-green-500" },
  { label: "Next Appointment", value: "Aug 25, 2024", icon: Calendar, color: "text-purple-500" },
];

const timelineEvents = [
    { week: 8, title: "First Ultrasound", description: "Confirmed heartbeat and due date." },
    { week: 12, title: "Nuchal Translucency Scan", description: "Screening for chromosomal abnormalities." },
    { week: 16, title: "Gender Reveal (Optional)", description: "Anatomy scan can often determine gender." },
    { week: 20, title: "Anatomy Scan", description: "Detailed check of baby's development." },
    { week: 24, title: "Glucose Screening", description: "Test for gestational diabetes." },
];

export default function WomensHealth() {
  const currentWeek = 22;
  const totalWeeks = 40;
  const progress = (currentWeek / totalWeeks) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplet className="h-6 w-6 text-primary" />
            Period Tracker
          </CardTitle>
          <CardDescription>Log your cycle and predict future periods.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6">
                <p className="text-muted-foreground">Next Period Starts In</p>
                <p className="text-5xl font-bold font-headline text-primary">5 Days</p>
                <p className="text-sm text-muted-foreground">on August 20, 2024</p>
            </div>
            <div className="space-y-4">
                <Card className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Current Cycle</p>
                            <p className="text-sm text-muted-foreground">Day 23 of 28</p>
                        </div>
                        <Button>Log Period</Button>
                    </div>
                </Card>
                <Card className="p-4">
                     <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Ovulation Estimate</p>
                            <p className="text-sm text-muted-foreground">August 6 (2 days ago)</p>
                        </div>
                        <Button variant="outline">View Calendar</Button>
                    </div>
                </Card>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-6 w-6 text-primary" />
            Pregnancy Tracker
          </CardTitle>
          <CardDescription>Your journey to motherhood, week by week.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Week {currentWeek} of {totalWeeks}</span>
              <span className="text-sm text-muted-foreground">Due Date: Dec 15, 2024</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm mt-2">Baby is the size of a coconut!</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {healthMetrics.map((metric, index) => (
                <Card key={index} className="p-4 flex items-center gap-4">
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                    <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="font-semibold text-lg">{metric.value}</p>
                    </div>
                </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Key Milestones & Appointments</CardTitle>
            <CardDescription>Important events throughout your pregnancy.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative pl-6">
                <div className="absolute left-[30px] top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                {timelineEvents.map((event, index) => (
                    <div key={index} className="relative flex items-start gap-6 mb-8">
                        <div className={`z-10 flex h-12 w-12 items-center justify-center rounded-full ${currentWeek >= event.week ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            <span className="font-bold">{event.week}w</span>
                        </div>
                        <div className="pt-2">
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
