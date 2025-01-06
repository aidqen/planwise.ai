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
import { format } from 'date-fns'
import { ScheduleSidebar } from '../components/ScheduleSidebar/ScheduleSidebar'
import { Loading } from '../components/Loading'
import { MobileDropdownMenu } from '../components/MobileDropdownMenu'
import { DesktopActions } from '../components/DesktopActions'
import { EditScheduleModal } from '../components/EditScheduleModal'
import { updateScheduleInUser } from '@/store/actions/user.actions'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DailySchedule({ }) {
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isCreateTask, setIsCreateTask] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const params = useParams()
  const [schedule, setSchedule] = useState({schedule: []})
  console.log("🚀 ~ file: page.jsx:30 ~ schedule:", schedule)
  const wakeupTime = schedule.preferences?.wakeup || '04:00';

  useEffect(() => {
    if (params?.id) {
      onFetchSchedule()
    }
  }, [])

  useEffect(() => {
    let timeoutId

    const handleMouseMove = () => {
      setLastMouseMove(Date.now())
      setIsVisible(true)
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        if (Date.now() - lastMouseMove >= 3000) {
          setIsVisible(false)
        }
      }, 3000)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [lastMouseMove])

  function toggleCalendarDialog() {
    setCalendarDialogOpen(!calendarDialogOpen)
  }

  function handleTaskClick(task) {
    setSelectedTask({ ...task });
  }

  function onCreateTask() {
    setIsCreateTask(true)
  }

  function handleCloseModal() {
    setIsCreateTask(false)
    setSelectedTask(null);
  }

  function deleteTask(taskId) {
    const tasksToSave = schedule?.schedule?.filter(prevTask => taskId !== prevTask.id)
    const scheduleToSave = { ...schedule, schedule: tasksToSave }
    setSchedule(scheduleToSave)
  }

  async function handleSaveTask(task) {
    try {
      const tasksToSave = schedule?.schedule?.map(prevTask => task.id === prevTask.id ? task : prevTask)
      const scheduleToSave = { ...schedule, schedule: tasksToSave }
      setSchedule(scheduleToSave)
    } catch (err){
      console.error(err);
    }
  }

  function handleNewTaskSave(task) {
    const tasksToSave = [...(schedule?.schedule || []), task];
    const scheduleToSave = { ...schedule, schedule: tasksToSave };
    setSchedule(scheduleToSave);
  }
  
  async function onFetchSchedule() {
    const scheduleToSave = await scheduleService.getScheduleById(params?.id)
    setSchedule(scheduleToSave)
  }

  async function handleSaveSchedule(e) {
    if (e) e.preventDefault()
    try {
      // Create a clean copy of the schedule without any circular references
      const scheduleToSave = {
        ...schedule,
        id: schedule._id,
        name: schedule.name,
        preferences: schedule.preferences,
        schedule: schedule.schedule,
        updatedAt: new Date().toISOString()
      }
      await scheduleService.updateSchedule(scheduleToSave)
      await updateScheduleInUser(scheduleToSave)
    } catch (err) {
      console.error(err)
    }
  }

  const wakeupMinutes = getMinutesFromMidnight(wakeupTime);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] overflow-y-hidden justify-between w-full">
      <ScheduleSidebar schedule={schedule}/>
      {!schedule || !schedule?.schedule.length ? (
        <Loading />
      ) : (
        <Card className="overflow-y-auto w-full bg-transparent border-none md:pt-16 scrollbar">
          <div className="mx-auto w-[80%]">
            <CardHeader className="flex flex-row gap-3 items-center pt-0 pb-5 pe-0 md:pb-9">
              <div className="flex flex-col items-start w-full">
                <CardTitle className="text-xl font-semibold text-center whitespace-nowrap">{schedule?.name}</CardTitle>
                <CardDescription className="mt-0 text-sm font-medium text-gray-600 whitespace-nowrap text-start max-sm:text-sm">
                  Last Updated: {format(new Date(schedule?.updatedAt), "MMM d, h:mm a")}
                </CardDescription>
              </div>
              <DesktopActions onCreateTask={onCreateTask} onEdit={() => setIsEditModalOpen(true)} handleSaveSchedule={handleSaveSchedule} />
              <MobileDropdownMenu onCreateTask={onCreateTask} onEdit={() => setIsEditModalOpen(true)} handleSaveSchedule={handleSaveSchedule} />
            </CardHeader>
            <CardContent className="">
              <div className="relative h-[1640px] w-full border-l-2 border-gray-300">
                <ScheduleStructure wakeupMinutes={wakeupMinutes} />
                <TaskList tasks={schedule.schedule.sort((a, b) => a.start.localeCompare(b.start))} wakeupMinutes={wakeupMinutes} handleTaskClick={handleTaskClick} />
              </div>
            </CardContent>
            <SaveToCalendarBtn toggleCalendarDialog={toggleCalendarDialog} isVisible={isVisible} />
          </div>
          <AddScheduleDialog
            open={calendarDialogOpen}
            onOpenChange={setCalendarDialogOpen}
            schedule={schedule}
          />
          <TaskDialog isCreateTask={isCreateTask} selectedTask={selectedTask} handleCloseModal={handleCloseModal} handleSaveTask={handleSaveTask} handleNewTaskSave={handleNewTaskSave} deleteTask={deleteTask}/>
          <EditScheduleModal 
            schedule={schedule}
            setSchedule={setSchedule}
            onSaveEditSchedule={handleSaveSchedule}
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
          />
        </Card>
      )}
    </div>
  );
}

function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
