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
import { TaskList } from '../components/TaskList'

export default function DailySchedule({ }) {
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isCreateTask, setIsCreateTask] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())
  const params = useParams()
  const [schedule, setSchedule] = useState(null)
  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm);
  const wakeupTime = multiStepForm?.preferences?.wakeup || '04:00';
  // console.log("🚀 ~ file: page.jsx:35 ~ schedule:", schedule)

  useEffect(() => {
    console.log('params:', params);
    onFetchSchedule()
  }, [params])




  // const schedule = useSelector(state => state.scheduleModule.schedule);
  // const schedule = {
  //   _id: '677871af4e0c76d49095eb9b',
  //   name: 'Daily Schedule',
  //   schedule: [
  //     {
  //       id: 't1',
  //       summary: 'Morning Routine',
  //       description: 'Hygiene and getting dressed for the day',
  //       start: '07:00',
  //       end: '07:50',
  //       category: 'routine'
  //     },
  //     {
  //       id: 't2',
  //       summary: 'Breakfast',
  //       description: 'Enjoy a nutritious breakfast',
  //       start: '07:30',
  //       end: '08:00',
  //       category: 'meal'
  //     },
  //     {
  //       id: 't3',
  //       summary: 'Work on Project A',
  //       description: 'Focus on key deliverables for Project A',
  //       start: '08:00',
  //       end: '09:30',
  //       category: 'goal'
  //     },
  //     {
  //       id: 'break1',
  //       summary: 'Short Break',
  //       description: 'Take a short break to recharge',
  //       start: '09:30',
  //       end: '09:45',
  //       category: 'break'
  //     },
  //     {
  //       id: 't4',
  //       summary: 'Email and Administrative Tasks',
  //       description: 'Check emails and complete any admin tasks',
  //       start: '09:45',
  //       end: '10:30',
  //       category: 'goal'
  //     },
  //     {
  //       id: 't5',
  //       summary: 'Continue Project A',
  //       description: 'Continue working on Project A tasks',
  //       start: '10:30',
  //       end: '12:00',
  //       category: 'goal'
  //     },
  //     {
  //       id: 't6',
  //       summary: 'Lunch',
  //       description: 'Enjoy a healthy lunch break',
  //       start: '12:00',
  //       end: '13:00',
  //       category: 'meal'
  //     },
  //     {
  //       id: 't7',
  //       summary: 'Team Meeting',
  //       description: 'Weekly team meeting to discuss progress and plans',
  //       start: '13:00',
  //       end: '14:00',
  //       category: 'goal'
  //     },
  //     {
  //       id: 'break2',
  //       summary: 'Relaxation Time',
  //       description: '30 minutes of relaxing to clear your mind',
  //       start: '14:00',
  //       end: '14:30',
  //       category: 'break'
  //     },
  //     {
  //       id: 't8',
  //       summary: 'Work on Project B',
  //       description: 'Focus on the tasks for Project B',
  //       start: '14:30',
  //       end: '16:00',
  //       category: 'goal'
  //     },
  //     {
  //       id: 'break3',
  //       summary: 'Outdoor Walk',
  //       description: 'Take a walk outside to refresh',
  //       start: '16:00',
  //       end: '16:30',
  //       category: 'break'
  //     },
  //     {
  //       id: 't9',
  //       summary: 'Project Review',
  //       description: 'Review completed project tasks and prepare for tomorrow',
  //       start: '16:30',
  //       end: '18:00',
  //       category: 'goal'
  //     },
  //     {
  //       id: 't10',
  //       summary: 'Dinner',
  //       description: 'Have a relaxing dinner',
  //       start: '18:00',
  //       end: '19:00',
  //       category: 'meal'
  //     },
  //     {
  //       id: 't11',
  //       summary: 'Reading',
  //       description: 'Read a book for personal growth',
  //       start: '19:00',
  //       end: '20:00',
  //       category: 'goal'
  //     },
  //     {
  //       id: 'break4',
  //       summary: 'Evening Relaxation',
  //       description: 'Relax and unwind with some leisure activities',
  //       start: '20:00',
  //       end: '21:00',
  //       category: 'break'
  //     },
  //     {
  //       id: 't12',
  //       summary: 'Night Routine',
  //       description: 'Prepare for bed and wind down for sleep',
  //       start: '21:00',
  //       end: '22:00',
  //       category: 'routine'
  //     }
  //   ],
  //   createdAt: 1735946671221,
  //   updatedAt: 1735946671221,
  //   preferences: { wakeup: '7:00', sleep: '10:00 PM', intensity: 'moderate' },
  //   routines: [],
  //   goals: []
  // }

  // Default to 4:00 AM if wakeup time is not set
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

  function onCreateTask() {
    setIsCreateTask(true)
  }

  function handleCloseModal() {
    setIsCreateTask(false)
    setSelectedTask(null); // Close the modal by clearing the selected task
  }

  async function handleSaveTask(task) {
    try {
      const tasksToSave = schedule?.schedule?.map(prevTask => task.id === prevTask.id ? task : prevTask)
      const scheduleToSave = { ...schedule, schedule: tasksToSave }
      setSchedule(scheduleToSave)
      // await scheduleService.updateSchedule(schedule)
    } catch (err){
      console.error(err);
      
    }
  }

  async function onFetchSchedule() {

    console.log("🚀 ~ file: page.jsx:187 ~ params?.id:", params?.id)
    const scheduleToSave = await scheduleService.getScheduleById(params?.id)
    console.log("🚀 ~ file: page.jsx:188 ~ scheduleToSave:", scheduleToSave)
    setSchedule(scheduleToSave)
  }

  const wakeupMinutes = getMinutesFromMidnight(wakeupTime); // Convert wake-up time to minutes from midnight

  if (!schedule || !schedule?.schedule?.length) return <div>Loading...</div>;
  const sortedTasks = [...schedule?.schedule]?.sort((a, b) => a.start?.localeCompare(b.start));

  return (
    <Card className="overflow-y-auto mx-auto w-full max-w-5xl bg-transparent border-none ps-9">
      <CardHeader className="flex flex-col gap-0 items-center pt-0 pb-5 ps-6 pe-10">
        <CardTitle className="text-lg font-semibold text-center">Daily Schedule</CardTitle>
        <CardDescription className="mt-0 text-base text-start max-sm:text-sm text-black/60">
          Here&apos;s your AI generated schedule for today.
        </CardDescription>
        <div className="flex justify-end w-full">
          <button onClick={onCreateTask} className='px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg'>+ Add New Task</button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[1640px] border-l-2 border-gray-300">
          <ScheduleStructure wakeupMinutes={wakeupMinutes} />
          <TaskList tasks={sortedTasks} wakeupMinutes={wakeupMinutes} handleTaskClick={handleTaskClick} />
        </div>
      </CardContent>
      <SaveToCalendarBtn toggleCalendarDialog={toggleCalendarDialog} isVisible={isVisible} />
      <AddScheduleDialog open={calendarDialogOpen} setOpen={setCalendarDialogOpen} schedule={schedule} />
      <TaskDialog isCreateTask={isCreateTask} selectedTask={selectedTask} handleCloseModal={handleCloseModal} handleSaveTask={handleSaveTask}/>
    </Card>
  );
}

function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
