'use client'

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { useState } from 'react'
import { useSelector } from 'react-redux'
// import { TaskCard } from './components/TaskCard'
// import { TaskDialog } from './components/TaskDialog'
import { useEffect, useState } from 'react'

// import { AddScheduleDialog } from './components/AddScheduleDialog'
// import { SaveToCalendarBtn } from './components/SaveToCalendarBtn'
// import { ScheduleStructure } from './components/ScheduleStructure'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScheduleStructure } from '../components/ScheduleStructure'
import { TaskCard } from '../components/TaskCard'
import { SaveToCalendarBtn } from '../components/SaveToCalendarBtn'
import { AddScheduleDialog } from '../components/AddScheduleDialog'
import { TaskDialog } from '../components/TaskDialog'
import { scheduleService } from '@/services/scheduleService'

export default function DailySchedule({ }) {
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())
  const params = useParams()
  const [schedule, setSchedule] = useState(null)
  console.log("🚀 ~ file: page.jsx:35 ~ schedule:", schedule)

  useEffect(() => {
    console.log('params:', params);
    onFetchSchedule()
  }, [params])

  async function onFetchSchedule() {
    const scheduleToSave = await scheduleService.getScheduleById(params?.id)
    setSchedule(scheduleToSave)
  }

  // const schedule = useSelector(state => state.scheduleModule.schedule);
  // const schedule = [
  //   {
  //     "id": "task1",
  //     "summary": "Morning Routine",
  //     "description": "Hygiene and getting dressed for the day",
  //     "start": "07:00",
  //     "end": "07:30",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task2",
  //     "summary": "Breakfast",
  //     "description": "Enjoy a nutritious breakfast",
  //     "start": "07:30",
  //     "end": "08:00",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task3",
  //     "summary": "Learn about indie hacking",
  //     "description": "Online research about methodologies to start with indie hacking",
  //     "start": "08:00",
  //     "end": "10:00",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "break1",
  //     "summary": "Short Break",
  //     "description": "Take a short break to recharge",
  //     "start": "10:00",
  //     "end": "10:15",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task4",
  //     "summary": "Develop my app",
  //     "description": "Work on developing essential features",
  //     "start": "10:15",
  //     "end": "12:00",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task5",
  //     "summary": "Lunch",
  //     "description": "Enjoy a balanced lunch",
  //     "start": "12:00",
  //     "end": "12:30",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task6",
  //     "summary": "Workout",
  //     "description": "Fit in a quick workout session",
  //     "start": "12:30",
  //     "end": "13:30",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task7",
  //     "summary": "Develop my app",
  //     "description": "Work on finalizing user interface",
  //     "start": "13:30",
  //     "end": "18:00",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task8",
  //     "summary": "Dinner",
  //     "description": "Have a healthy dinner",
  //     "start": "18:00",
  //     "end": "18:30",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task9",
  //     "summary": "Read a book",
  //     "description": "Read for leisure or personal development",
  //     "start": "18:30",
  //     "end": "21:00",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "break2",
  //     "summary": "Short Break",
  //     "description": "Take a short break to relax",
  //     "start": "21:00",
  //     "end": "21:15",
  //     "timeZone": "Asia/Jerusalem"
  //   },
  //   {
  //     "id": "task10",
  //     "summary": "Evening Routine",
  //     "description": "Relax and prepare for bed",
  //     "start": "21:15",
  //     "end": "22:00",
  //     "timeZone": "Asia/Jerusalem"
  //   }
  // ]

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
    setSelectedTask({ ...task }); // Set the selected task to display in the modal
  }

  function handleCloseModal() {
    setSelectedTask(null); // Close the modal by clearing the selected task
  }


  const wakeupMinutes = getMinutesFromMidnight(wakeupTime); // Convert wake-up time to minutes from midnight

  if (!schedule || !schedule?.schedule?.length) return <div>Loading...</div>;
  const sortedTasks = [...schedule?.schedule]?.sort((a, b) => a.start?.localeCompare(b.start));

  return (
    <Card className="overflow-y-auto mx-auto w-full max-w-4xl bg-transparent border-none ps-9">
      <CardHeader className="flex flex-col gap-0 items-center py-5 ps-6 pe-10">
        <CardTitle className="text-lg font-semibold text-center">Daily Schedule</CardTitle>
        <CardDescription className="mt-0 text-base text-start max-sm:text-sm text-black/60">
          Here&apos;s your AI generated schedule for today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[1640px] border-l-2 border-gray-300">
          <ScheduleStructure wakeupMinutes={wakeupMinutes} />
          {sortedTasks?.map(task => (
            <TaskCard key={task.id} task={task} wakeupMinutes={wakeupMinutes} handleTaskClick={handleTaskClick} />
          ))}
        </div>
      </CardContent>
      <SaveToCalendarBtn toggleCalendarDialog={toggleCalendarDialog} isVisible={isVisible} />
      <AddScheduleDialog open={calendarDialogOpen} setOpen={setCalendarDialogOpen} schedule={schedule} />
      <TaskDialog selectedTask={selectedTask} handleCloseModal={handleCloseModal} />
    </Card>
  );
}




function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
