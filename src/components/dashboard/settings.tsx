
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Settings() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account and notification settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Appearance</h3>
            <Card className="p-6">
               <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="theme-mode" className="flex flex-col space-y-1">
                  <span>Theme</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Select your preferred theme.
                  </span>
                </Label>
                <RadioGroup
                  defaultValue={theme}
                  onValueChange={setTheme}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </RadioGroup>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications</h3>
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="appointment-reminders" className="flex flex-col space-y-1">
                  <span>Appointment Reminders</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive reminders for your upcoming appointments.
                  </span>
                </Label>
                <Switch id="appointment-reminders" defaultChecked />
              </div>
               <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="medication-reminders" className="flex flex-col space-y-1">
                  <span>Medication Reminders</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Get notified when it's time to take your medicine.
                  </span>
                </Label>
                <Switch id="medication-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="report-notifications" className="flex flex-col space-y-1">
                  <span>New Reports</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Be notified when new lab or scan results are available.
                  </span>
                </Label>
                <Switch id="report-notifications" />
              </div>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
