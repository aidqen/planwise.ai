'use client'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScheduleStructure } from '../components/ScheduleStructure'
import { SaveToCalendarBtn } from '../components/SaveToCalendarBtn'
import { AddScheduleDialog } from '../components/AddScheduleDialog'
import { TaskDialog } from '../components/TaskDialog'
import { scheduleService } from '@/services/scheduleService'
import { TaskList } from '../components/TaskList'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import {CategoryDropdown} from '../components/CategoryDropdown'

export default function DailySchedule({ }) {
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isCreateTask, setIsCreateTask] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())
  const params = useParams()
  const [schedule, setSchedule] = useState({schedule: []})
  console.log("🚀 ~ file: page.jsx:37 ~ schedule:", schedule)
  const wakeupTime = schedule.preferences?.wakeup || '04:00';

  useEffect(() => {
    console.log('params:', params);
    onFetchSchedule()
  }, [])

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

  function deleteTask(taskId) {
    const tasksToSave = schedule?.schedule?.filter(prevTask => taskId !== prevTask.id)
    const scheduleToSave = { ...schedule, schedule: tasksToSave }
    setSchedule(scheduleToSave)
  }

  async function handleSaveTask(task) {
    console.log('update task');
    
    try {
      const tasksToSave = schedule?.schedule?.map(prevTask => task.id === prevTask.id ? task : prevTask)
      const scheduleToSave = { ...schedule, schedule: tasksToSave }
      setSchedule(scheduleToSave)
      // await scheduleService.updateSchedule(schedule)
    } catch (err){
      console.error(err);
    }
  }

  function handleNewTaskSave(task) {
    console.log('new task');
    
    const tasksToSave = [...(schedule?.schedule || []), task];
    const scheduleToSave = { ...schedule, schedule: tasksToSave };
    
    setSchedule(scheduleToSave);
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
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] justify-between w-full">
      <CategoryDropdown tasks={sortedTasks}/>
    <Card className="overflow-y-auto mx-auto w-full max-w-5xl bg-transparent border-none scrollbar ps-9">
      <CardHeader className="flex flex-col gap-0 items-center pt-0 pb-5 ps-6 pe-10">
        <CardTitle className="text-xl font-medium text-center">{schedule?.name}</CardTitle>
        <CardDescription className="mt-0 text-sm text-gray-600 text-start max-sm:text-sm">
          Last Updated: {format(new Date(schedule?.updatedAt), "MMM d, h:mm a")}
        </CardDescription>
        <div className="flex flex-col gap-3 justify-end w-full sm:flex-row">
          <Button onClick={onCreateTask} className='px-4 py-2 w-full text-sm font-medium text-white bg-blue-500 rounded-lg sm:w-auto'>+ Add New Task</Button>
          <Button variant="outline" className="w-full hover:bg-white/70 sm:w-auto">Save</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[1640px] w-[calc(100%-2em)] border-l-2 border-gray-300">
          <ScheduleStructure wakeupMinutes={wakeupMinutes} />
          <TaskList tasks={sortedTasks} wakeupMinutes={wakeupMinutes} handleTaskClick={handleTaskClick} />
        </div>
      </CardContent>
      <SaveToCalendarBtn toggleCalendarDialog={toggleCalendarDialog} isVisible={isVisible} />
      <AddScheduleDialog open={calendarDialogOpen} setOpen={setCalendarDialogOpen} schedule={schedule} />
      <TaskDialog isCreateTask={isCreateTask} selectedTask={selectedTask} handleCloseModal={handleCloseModal} handleSaveTask={handleSaveTask} handleNewTaskSave={handleNewTaskSave} deleteTask={deleteTask}/>
    </Card>
    </div>
  );
}

function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
