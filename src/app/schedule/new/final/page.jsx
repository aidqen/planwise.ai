'use client'
import { Clock, Moon, Sun, Target, Repeat, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSelector } from 'react-redux';

export default function App() {
  // Example data - replace with your actual data
  const schedule = useSelector(state => state.scheduleModule.multiStepForm);
  const scheduleParams = {
    wakeTime: "06:00 AM",
    sleepTime: "10:00 PM",
    intensity: "Moderate",
    goals: [
      "Learn Spanish",
      "Exercise 3x per week",
      "Read 20 pages daily"
    ],
    routines: [
      "Morning meditation",
      "Evening workout",
      "Daily journaling"
    ]
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto pb-5 bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl tracking-tight font-semibold mb-4 w-full text-start">Schedule Review</h1>
          <p className="text-muted-foreground text-start">Review your preferences before generating your smart schedule</p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Sun className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Wake Time</h2>
                <p className="text-muted-foreground">{scheduleParams.wakeTime}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Moon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Sleep Time</h2>
                <p className="text-muted-foreground">{scheduleParams.sleepTime}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Schedule Intensity</h2>
                <p className="text-muted-foreground">{scheduleParams.intensity}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Goals</h2>
              </div>
            </div>
            <Separator className="my-4" />
            <ul className="space-y-2">
              {scheduleParams.goals.map((goal, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Repeat className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Routines</h2>
              </div>
            </div>
            <Separator className="my-4" />
            <ul className="space-y-2">
              {scheduleParams.routines.map((routine, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{routine}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="flex justify-center pt-6">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8">
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Smart Schedule
          </Button>
        </div>
      </div>
    </div>
  );
}
