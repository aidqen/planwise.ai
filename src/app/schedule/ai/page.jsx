'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { AddScheduleDialog } from './components/AddScheduleDialog'

export default function DailySchedule({}) {
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())

  // const aiSchedule = useSelector(state => state.scheduleModule.aiSchedule);
  const aiSchedule = [
    {
      "id": "task1",
      "summary": "Morning Routine",
      "description": "Hygiene and getting dressed for the day",
      "start": "07:00",
      "end": "07:30",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task2",
      "summary": "Breakfast",
      "description": "Enjoy a nutritious breakfast",
      "start": "07:30",
      "end": "08:00",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task3",
      "summary": "Learn about indie hacking",
      "description": "Online research about methodologies to start with indie hacking",
      "start": "08:00",
      "end": "10:00",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "break1",
      "summary": "Short Break",
      "description": "Take a short break to recharge",
      "start": "10:00",
      "end": "10:15",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task4",
      "summary": "Develop my app",
      "description": "Work on developing essential features",
      "start": "10:15",
      "end": "12:00",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task5",
      "summary": "Lunch",
      "description": "Enjoy a balanced lunch",
      "start": "12:00",
      "end": "12:30",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task6",
      "summary": "Workout",
      "description": "Fit in a quick workout session",
      "start": "12:30",
      "end": "13:30",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task7",
      "summary": "Develop my app",
      "description": "Work on finalizing user interface",
      "start": "13:30",
      "end": "18:00",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task8",
      "summary": "Dinner",
      "description": "Have a healthy dinner",
      "start": "18:00",
      "end": "18:30",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task9",
      "summary": "Read a book",
      "description": "Read for leisure or personal development",
      "start": "18:30",
      "end": "21:00",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "break2",
      "summary": "Short Break",
      "description": "Take a short break to relax",
      "start": "21:00",
      "end": "21:15",
      "timeZone": "Asia/Jerusalem"
    },
    {
      "id": "task10",
      "summary": "Evening Routine",
      "description": "Relax and prepare for bed",
      "start": "21:15",
      "end": "22:00",
      "timeZone": "Asia/Jerusalem"
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
      if (Date.now() - lastMouseMove > 1000) {
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

  function toggleCalendarDialog() {
    setCalendarDialogOpen(state => !state)
  }

  function handleTaskClick(task) {
    console.log('task:', task)
    setSelectedTask({ ...task }); // Set the selected task to display in the modal
  }

  function handleCloseModal() {
    setSelectedTask(null); // Close the modal by clearing the selected task
  }


  const wakeupMinutes = getMinutesFromMidnight(wakeupTime); // Convert wake-up time to minutes from midnight

  const sortedTasks = [...aiSchedule]?.sort((a, b) => a.start?.localeCompare(b.start));
  if (!aiSchedule?.length) return <div>Loading...</div>;

  return (
    <Card className="overflow-y-auto mx-auto w-full max-w-4xl bg-transparent border-none ps-10">
      <CardHeader className="flex flex-col gap-1 justify-between items-start pb-6">
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
      {/* Mobile: Always visible */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:hidden">
        <Button 
          onClick={toggleCalendarDialog}
          className="text-gray-100 bg-green-500 shadow-xl transition-all hover:scale-[1.02] duration-100 hover:shadow-xl"
        >
          <CalendarIcon />
          Add To Calendar
        </Button>
      </div>

      {/* Desktop: Animated */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? 
            { opacity: 1, y: 0, scale: 1 } : 
            { opacity: 0, y: 50, scale: 0.95 }
          }
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 1
          }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <Button 
            onClick={toggleCalendarDialog}
            className="text-gray-100 bg-green-500 shadow-md transition-all hover:scale-[1.02] duration-100 hover:shadow-xl"
          >
            <CalendarIcon />
            Add To Calendar
          </Button>
        </motion.div>
      </div>
      <AddScheduleDialog open={calendarDialogOpen} setOpen={setCalendarDialogOpen} />
      <TaskDialog selectedTask={selectedTask} handleCloseModal={handleCloseModal} />
    </Card>
  );
}




function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
