
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Footprints, Bed, Flame, UtensilsCrossed, Zap } from 'lucide-react';
import { useFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

// Mock health report data. In a real app, this would come from Firestore.
const mockHealthReport = {
  cholesterol: 210, // mg/dL
  sugarLevel: 125, // mg/dL
  bmi: 24.5,
};

// Mock wearable data to be shown after 'connecting'.
const mockWearableData = {
  heartRate: 78,
  steps: 6432,
  sleepHours: 6.8,
  caloriesBurned: 320,
};

export default function FitnessAndNutrition() {
  const { firestore, user } = useFirebase();
  const [isConnected, setIsConnected] = useState(false);
  const [wearableData, setWearableData] = useState(mockWearableData);
  const [nutritionPlan, setNutritionPlan] = useState('');

  // This function simulates connecting to a Bluetooth device.
  // The Web Bluetooth API requires a secure context (HTTPS) and user interaction.
  const handleConnect = () => {
    // We'll just simulate the connection for demo purposes.
    console.log('Simulating connection to wearable device...');
    setIsConnected(true);
  };

  useEffect(() => {
    // This effect generates the nutrition plan based on the mock health report.
    const generateNutritionPlan = () => {
      let suggestion = 'Balanced diet with fruits, lean protein, and hydration.';
      if (mockHealthReport.cholesterol > 200) {
        suggestion = 'Low-fat diet with oats, nuts, and green tea to manage cholesterol.';
      } else if (mockHealthReport.sugarLevel > 120) {
        suggestion = 'Low-sugar diet: avoid sweets, focus on protein and vegetables to manage sugar levels.';
      }
      setNutritionPlan(suggestion);
    };

    generateNutritionPlan();
  }, []);

  useEffect(() => {
    // This effect simulates saving data to Firestore when the component mounts and data is available.
    if (isConnected && user && firestore) {
      const fitnessDataCollection = collection(firestore, `users/${user.uid}/fitnessData`);
      addDocumentNonBlocking(fitnessDataCollection, {
        patientId: user.uid,
        ...wearableData,
        date: new Date().toISOString(),
      });

      const nutritionPlansCollection = collection(firestore, `users/${user.uid}/nutritionPlans`);
      addDocumentNonBlocking(nutritionPlansCollection, {
        patientId: user.uid,
        plan: nutritionPlan,
        date: new Date().toISOString(),
      });
    }
  }, [isConnected, user, firestore, wearableData, nutritionPlan]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fitness & Nutrition Dashboard</CardTitle>
          <CardDescription>Connect your wearable and get personalized nutrition suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg text-center p-4">
              <Zap className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground mb-4">Connect your wearable device to see live fitness data.</p>
              <Button onClick={handleConnect}>Connect to Wearable Device</Button>
              <p className="text-xs text-muted-foreground mt-2">(This is a simulation for demo purposes)</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">📟 Fitness Tracker Summary</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{wearableData.heartRate} bpm</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Steps</CardTitle>
                      <Footprints className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{wearableData.steps.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                      <Bed className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{wearableData.sleepHours} hrs</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                      <Flame className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{wearableData.caloriesBurned} kcal</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">🍎 Nutrition Recommendation</h3>
                <Card className="bg-accent/20 border-accent">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="bg-accent rounded-full p-3">
                        <UtensilsCrossed className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                        <CardTitle>Your Recommended Nutrition Plan</CardTitle>
                        <CardDescription>Based on your latest health data.</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-accent-foreground/90">{nutritionPlan}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                        This suggestion is auto-generated based on mock health data (Cholesterol: {mockHealthReport.cholesterol}, Sugar: {mockHealthReport.sugarLevel}).
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    