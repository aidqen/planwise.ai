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
import { getMinutesFromMidnight } from '@/services/util.service'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

const DEFAULT_SCHEDULE = {
  schedule: [],
  preferences: {
    wakeup: '04:00'
  }
}

export default function DailySchedule() {
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  console.log("🚀 ~ file: page.jsx:33 ~ selectedTask:", selectedTask)
  const [isCreateTask, setIsCreateTask] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editedSchedule, setEditedSchedule] = useState(null)
  const params = useParams()
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE)
  const wakeupTime = schedule?.preferences?.wakeup || '04:00'
  const wakeupMinutes = getMinutesFromMidnight(wakeupTime)
  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm)

  useEffect(() => {
    if (params?.id) {
      onFetchSchedule()
    }
  }, [params?.id])

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

  const onFetchSchedule = async () => {
    try {
      setIsLoading(true)
      const fetchedSchedule = await scheduleService.getScheduleById(params.id)
      setSchedule(fetchedSchedule || DEFAULT_SCHEDULE)
    } catch (error) {
      console.error('Error fetching schedule:', error)
      setSchedule(DEFAULT_SCHEDULE)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScheduleEdit = (newSchedule) => {
    setEditedSchedule(newSchedule)
  }

  const handleAcceptChanges = async () => {
    try {
      const updatedSchedule = { ...schedule, id: schedule._id, schedule: editedSchedule }
      console.log("🚀 ~ file: page.jsx:93 ~ updatedSchedule:", updatedSchedule)
      await scheduleService.updateSchedule(updatedSchedule)
      setSchedule(updatedSchedule)
      setEditedSchedule(null)
    } catch (error) {
      console.error('Failed to accept changes:', error)
    }
  }

  const handleRejectChanges = () => {
    setEditedSchedule(null)
  }

  function handleTaskClick(task) {
    setSelectedTask({ ...task })
  }

  function onCreateTask() {
    setIsCreateTask(true)
  }

  function handleCloseModal() {
    setSelectedTask(null)
    setIsCreateTask(false)
  }

  function deleteTask(taskId) {
    const tasksToSave = schedule?.schedule?.filter(prevTask => taskId !== prevTask.id)
    const scheduleToSave = { ...schedule, schedule: tasksToSave }
    setSchedule(scheduleToSave)
  }

  function handleSaveTask(taskToSave) {
    const tasksToSave = schedule?.schedule?.map(prevTask =>
      prevTask.id === taskToSave.id ? taskToSave : prevTask
    )
    const scheduleToSave = { ...schedule, schedule: tasksToSave }
    setSchedule(scheduleToSave)
  }

  function handleNewTaskSave(taskToSave) {
    const tasksToSave = [...(schedule?.schedule || []), taskToSave]
    const scheduleToSave = { ...schedule, schedule: tasksToSave }
    setSchedule(scheduleToSave)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] overflow-y-hidden justify-between w-full">
      <ScheduleSidebar
        schedule={isLoading ? multiStepForm : schedule}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        multiStepForm={multiStepForm}
        onScheduleEdit={handleScheduleEdit}
      />
      {(isLoading || !schedule?.schedule?.length) ? (
        <Loading />
      ) : (
        <Card className="relative overflow-y-auto w-full bg-transparent border-none md:pt-16 scrollbar">
          <div className="mx-auto w-[80%] relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daily Schedule</CardTitle>
                  <CardDescription>
                    {format(new Date(), 'EEEE, MMMM do yyyy')}
                  </CardDescription>
                </div>
                <div className="hidden md:flex gap-4">
                  <DesktopActions
                    schedule={schedule}
                    onOpenCalendarDialog={() => setCalendarDialogOpen(true)}
                    onCreateTask={onCreateTask}
                  />
                </div>
                <div className="md:hidden">
                  <MobileDropdownMenu
                    schedule={schedule}
                    onOpenCalendarDialog={() => setCalendarDialogOpen(true)}
                    onCreateTask={onCreateTask}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="relative h-[1640px] w-full border-l-2 border-gray-300 pl-16 pr-4">
                <ScheduleStructure wakeupMinutes={wakeupMinutes} />
                <TaskList
                  tasks={editedSchedule || schedule.schedule}
                  wakeupMinutes={wakeupMinutes}
                  handleTaskClick={handleTaskClick}
                />
              </div>

              {editedSchedule && (
                <div className="sticky bottom-4 flex justify-center z-50">
                  <div className="flex gap-4 p-4 rounded-lg">
                    <Button
                      onClick={handleRejectChanges}
                      className="flex items-center bg-red-500 gap-2 text-white hover:bg-red-600 shadow-md"
                    >
                      <X className="w-4 h-4" />
                      Reject Changes
                    </Button>
                    <Button
                      onClick={handleAcceptChanges}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 shadow-md text-white"
                    >
                      <Check className="w-4 h-4" />
                      Accept Changes
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </div>

          {!editedSchedule && <SaveToCalendarBtn 
            toggleCalendarDialog={() => setCalendarDialogOpen(true)} 
            isVisible={isVisible} 
          />}
        </Card>
      )}

      <TaskDialog
        selectedTask={selectedTask}
        isCreateTask={isCreateTask}
        handleCloseModal={handleCloseModal}
        handleSaveTask={handleSaveTask}
        handleNewTaskSave={handleSaveTask}
        deleteTask={deleteTask}
        schedule={schedule}
        onScheduleUpdate={setSchedule}
      />

      <AddScheduleDialog
        open={calendarDialogOpen}
        onOpenChange={setCalendarDialogOpen}
        schedule={schedule}
      />

      <EditScheduleModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        schedule={schedule}
        onScheduleUpdate={setSchedule}
      />
    </div>
  )
}
