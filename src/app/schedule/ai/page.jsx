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
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DailySchedule({ }) {
  const [selectedTask, setSelectedTask] = useState(null)
  const [taskSelected, setTaskSelected] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())
  console.log('taskSelected:', taskSelected)

  // const aiSchedule = useSelector(state => state.scheduleModule.aiSchedule);
  const aiSchedule = [
    {
      "id": "routine_01",
      "summary": "Morning Routine",
      "description": "Prepare for the day",
      "timeZone": "Asia/Jerusalem",
      "start": "07:00",
      "end": "07:30"
    },
    {
      "id": "meal_01",
      "summary": "Breakfast",
      "description": "Enjoy a healthy breakfast",
      "timeZone": "Asia/Jerusalem",
      "start": "08:00",
      "end": "08:30"
    },
    {
      "id": "goal_01",
      "summary": "Read a book",
      "description": "Morning reading session",
      "timeZone": "Asia/Jerusalem",
      "start": "08:30",
      "end": "09:00"
    },
    {
      "id": "routine_02",
      "summary": "Work",
      "description": "Scheduled work hours",
      "timeZone": "Asia/Jerusalem",
      "start": "09:00",
      "end": "17:00"
    },
    {
      "id": "meal_02",
      "summary": "Lunch",
      "description": "Enjoy a quick lunch break during work",
      "timeZone": "Asia/Jerusalem",
      "start": "12:00",
      "end": "13:00"
    },
    {
      "id": "goal_02",
      "summary": "Read a book",
      "description": "Afternoon reading session",
      "timeZone": "Asia/Jerusalem",
      "start": "17:30",
      "end": "18:00"
    },
    {
      "id": "routine_03",
      "summary": "Gym",
      "description": "Workout session",
      "timeZone": "Asia/Jerusalem",
      "start": "19:00",
      "end": "20:00"
    },
    {
      "id": "meal_03",
      "summary": "Dinner",
      "description": "Have a balanced dinner",
      "timeZone": "Asia/Jerusalem",
      "start": "20:30",
      "end": "21:30"
    },
    {
      "id": "goal_03",
      "summary": "Learn Spanish",
      "description": "Evening Spanish learning session",
      "timeZone": "Asia/Jerusalem",
      "start": "21:30",
      "end": "22:00"
    },
    {
      "id": "routine_04",
      "summary": "Night Routine",
      "description": "Prepare for sleep",
      "timeZone": "Asia/Jerusalem",
      "start": "22:00",
      "end": "22:30"
    }
  ]

  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm);
  const wakeupTime = multiStepForm?.preferences?.wakeup || '04:00'; // Default to 4:00 AM if wakeup time is not set
  // const wakeupTime = '07:00';

  useEffect(() => {
    let timeoutId

    const handleMouseMove = () => {
      setIsVisible(true)
      setLastMouseMove(Date.now())
    }

    const checkMouseInactivity = () => {
      if (Date.now() - lastMouseMove > 3000) {
        setIsVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    timeoutId = setInterval(checkMouseInactivity, 1000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(timeoutId)
    }
  }, [lastMouseMove])

  function handleTaskClick(task) {
    console.log('task:', task)
    setSelectedTask({ ...task }); // Set the selected task to display in the modal
    setTaskSelected(task)
  }

  function handleCloseModal() {
    setSelectedTask(null); // Close the modal by clearing the selected task
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
            <TaskCard key={task.id} task={task} wakeupMinutes={wakeupMinutes} handleTaskClick={handleTaskClick} />
          ))}
        </div>
      </CardContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} // Starting animation state
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }} // Animation on visibility change
        exit={{ opacity: 0, scale: 0.95 }} // Exit animation
        transition={{ duration: 0.3 }} // Adjust duration as needed
        className="fixed bottom-6 right-[50%] -translate-x-1/2"
      >

        <Button className={cn('fixed bottom-6 right-[50%] -translate-x-1/2 bg-yellow-500 hover:bg-yellow-600', isVisible ? 'opacity-100' : 'opacity-0')}>
          Add To Google Calendar
        </Button>
      </motion.div>
      <TaskDialog selectedTask={selectedTask} handleCloseModal={handleCloseModal} />
    </Card>
  );
}




function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
