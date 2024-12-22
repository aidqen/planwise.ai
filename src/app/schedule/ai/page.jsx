'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import { useState } from 'react'
import { useSelector } from 'react-redux'
import { TaskCard } from './components/TaskCard'
import { TaskDialog } from './components/TaskDialog'
import { useState } from 'react'

export default function DailySchedule({}) {
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  // console.log('selectedTask:', selectedTask)
  
  // const aiSchedule = useSelector(state => state.scheduleModule.aiSchedule);
  const aiSchedule = [
    {
      "id": "routine_01",
      "summary": "Morning Routine",
      "description": "Prepare for the day",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T07:00:00+02:00",
      "end": "2024-12-18T07:30:00+02:00"
    },
    {
      "id": "meal_01",
      "summary": "Breakfast",
      "description": "Enjoy a healthy breakfast",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T08:00:00+02:00",
      "end": "2024-12-18T08:30:00+02:00"
    },
    {
      "id": "goal_01",
      "summary": "Read a book",
      "description": "Morning reading session",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T08:30:00+02:00",
      "end": "2024-12-18T09:00:00+02:00"
    },
    {
      "id": "routine_02",
      "summary": "Work",
      "description": "Scheduled work hours",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T09:00:00+02:00",
      "end": "2024-12-18T17:00:00+02:00"
    },
    {
      "id": "meal_02",
      "summary": "Lunch",
      "description": "Enjoy a quick lunch break during work",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T12:00:00+02:00",
      "end": "2024-12-18T13:00:00+02:00"
    },
    {
      "id": "goal_02",
      "summary": "Read a book",
      "description": "Afternoon reading session",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T17:30:00+02:00",
      "end": "2024-12-18T18:00:00+02:00"
    },
    {
      "id": "routine_03",
      "summary": "Gym",
      "description": "Workout session",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T19:00:00+02:00",
      "end": "2024-12-18T20:00:00+02:00"
    },
    {
      "id": "meal_03",
      "summary": "Dinner",
      "description": "Have a balanced dinner",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T20:30:00+02:00",
      "end": "2024-12-18T21:30:00+02:00"
    },
    {
      "id": "goal_03",
      "summary": "Learn Spanish",
      "description": "Evening Spanish learning session",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T21:30:00+02:00",
      "end": "2024-12-18T22:00:00+02:00"
    },
    {
      "id": "routine_04",
      "summary": "Night Routine",
      "description": "Prepare for sleep",
      "timeZone": "Asia/Jerusalem",
      "start": "2024-12-18T22:00:00+02:00",
      "end": "2024-12-18T22:30:00+02:00"
    }
  ]
  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm);
  const wakeupTime = multiStepForm?.preferences?.wakeup || '04:00'; // Default to 4:00 AM if wakeup time is not set
  // const wakeupTime = '07:00';

  function handleTaskClick(task) {
    console.log('hiiiiiiiiii');
    
    console.log('task:', task)
    setTaskToEdit(task); // Set the selected task to display in the modal
  }

  function handleCloseModal() {
    setTaskToEdit(null); // Close the modal by clearing the selected task
  }

  const wakeupMinutes = getMinutesFromMidnight(wakeupTime); // Convert wake-up time to minutes from midnight

  const sortedTasks = [...aiSchedule]?.sort((a, b) => a.start?.localeCompare(b.start));
  if (!aiSchedule?.length) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-4xl ps-10 mx-auto overflow-y-auto bg-transparent border-none">
      <CardHeader className="flex flex-col items-start justify-between pb-6 gap-1">
        <CardTitle className="text-xl font-medium">Daily Schedule</CardTitle>
        <CardDescription className="text-base max-sm:text-sm text-black/60">
          Here&apos;s your AI generated schedule for today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[1440px] border-l-2 border-gray-300">
          {Array.from({ length: 24 }).map((_, index) => {
            const hour = Math.floor((wakeupMinutes + index * 60) / 60) % 24; // Calculate the hour dynamically
            return (
              <div
                key={index}
                className="absolute left-0 w-full text-sm text-gray-400"
                style={{ top: `${(index / 24) * 100}%` }}
              >
                <div className="absolute -left-16 w-12 text-right">
                  {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
                </div>
                <div className="h-[1px] bg-gray-200" />
              </div>
            );
          })}
          {sortedTasks?.map(task => (
            <TaskCard key={task.id} task={task} wakeupMinutes={wakeupMinutes} handleTaskClick={handleTaskClick}/>
          ))}
        </div>
      </CardContent>
      <TaskDialog selectedTask={taskToEdit} handleCloseModal={handleCloseModal} />
    </Card>
  );
}




function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
