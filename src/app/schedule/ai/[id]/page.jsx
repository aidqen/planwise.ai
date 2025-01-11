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
import { SET_SCHEDULE } from '@/store/reducers/schedule.reducer'
import { useDispatch } from 'react-redux'

const DEFAULT_SCHEDULE = {
  schedule: [],
  preferences: {
    wakeup: '04:00'
  }
}

export default function DailySchedule() {
  // const dispatch = useDispatch()
  const params = useParams()

  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isCreateTask, setIsCreateTask] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editedSchedule, setEditedSchedule] = useState(null)
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE)
  // console.log("🚀 ~ file: page.jsx:45 ~ schedule:", schedule)
  // const schedule = useSelector(state => state.scheduleModule.schedule)
  const wakeupTime = schedule?.preferences?.wakeup || '04:00'
  const wakeupMinutes = getMinutesFromMidnight(wakeupTime)
  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm)

  useEffect(() => {
    if (params?.id) {
      onFetchSchedule()
    }
  }, [params?.id])

  const onFetchSchedule = async () => {
    try {
      setIsLoading(true)
      const fetchedSchedule = await scheduleService.getScheduleById(params.id)
      // dispatch({type: SET_SCHEDULE, schedule: fetchedSchedule })
      setSchedule(fetchedSchedule || DEFAULT_SCHEDULE)
    } catch (error) {
      console.error('Error fetching schedule:', error)
      // dispatch({type: SET_SCHEDULE, schedule: DEFAULT_SCHEDULE })
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
      // Create a merged schedule with all original fields and AI updates
      const updatedSchedule = {
        ...schedule,  // Keep all original schedule fields (routines, goals, etc)
        ...editedSchedule,  // Override with AI's changes (preferences, schedule array)
      };

      setSchedule(updatedSchedule)
      await scheduleService.updateSchedule(updatedSchedule)
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
    // dispatch({type: SET_SCHEDULE, schedule: scheduleToSave})
    setSchedule(scheduleToSave)
  }

  function handleSaveTask(taskToSave) {
    const tasksToSave = schedule?.schedule?.map(prevTask =>
      prevTask.id === taskToSave.id ? taskToSave : prevTask
    )
    const scheduleToSave = { ...schedule, schedule: tasksToSave }
    // dispatch({type: SET_SCHEDULE, schedule: scheduleToSave})
    setSchedule(scheduleToSave)
  }

  function handleNewTaskSave(taskToSave) {
    const tasksToSave = [...(schedule?.schedule || []), taskToSave]
    const scheduleToSave = { ...schedule, schedule: tasksToSave }
    setSchedule(scheduleToSave)
    // dispatch({type: SET_SCHEDULE, schedule: scheduleToSave})
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] overflow-y-hidden justify-between w-full">
      <ScheduleSidebar
        schedule={schedule}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setSchedule={setSchedule}
        multiStepForm={multiStepForm}
        onScheduleEdit={handleScheduleEdit}
        isEditedSchedule={!!editedSchedule}
      />
      {(isLoading || !schedule?.schedule?.length) ? (
        <Loading />
      ) : (
        <Card className="overflow-y-auto relative w-full bg-transparent border-none md:pt-16 scrollbar">
          <div className="mx-auto ps-8 w-full md:w-[80%] relative">
            <CardHeader className="pt-0">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <CardTitle>Daily Schedule</CardTitle>
                  <CardDescription className="text-gray-600">
                    {format(new Date(), 'EEEE, MMMM do yyyy')}
                  </CardDescription>
                </div>
                <div className="hidden gap-4 md:flex">
                  <DesktopActions
                    schedule={schedule}
                    onOpenCalendarDialog={() => setCalendarDialogOpen(true)}
                    onCreateTask={onCreateTask}
                    setIsEditModalOpen={setIsEditModalOpen}
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
              <div className="relative h-[1640px] w-full border-l-2 border-gray-300 pl-8 pr-4">
                <ScheduleStructure wakeupMinutes={wakeupMinutes} />
                <TaskList
                  tasks={editedSchedule?.schedule || schedule.schedule}
                  wakeupMinutes={wakeupMinutes}
                  handleTaskClick={handleTaskClick}
                />
              </div>

              {editedSchedule && (
                <div className="flex md:sticky fixed w-full gap-3 left-0 bottom-4 z-50 justify-center">
                  {/* <div className="flex gap-2 md:gap-4 px-0 rounded-lg"> */}
                    <Button
                      onClick={handleRejectChanges}
                      className="flex gap-2 px-2 text-xs py-1 md:py-2 md:px-4 items-center text-white bg-red-500 shadow-md hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                      Reject Changes
                    </Button>
                    <Button
                      onClick={handleAcceptChanges}
                      className="flex gap-2 px-2 text-xs py-1 md:py-2 md:px-4 items-center text-white bg-green-500 shadow-md hover:bg-green-600"
                    >
                      <Check className="w-4 h-4" />
                      Accept Changes
                    </Button>
                  {/* </div> */}
                </div>
              )}
            </CardContent>
          </div>

          {!editedSchedule && <SaveToCalendarBtn
            toggleCalendarDialog={() => setCalendarDialogOpen(true)}
          />}
        </Card>
      )}

      <TaskDialog
        selectedTask={selectedTask}
        isCreateTask={isCreateTask}
        handleCloseModal={handleCloseModal}
        handleSaveTask={handleSaveTask}
        handleNewTaskSave={handleNewTaskSave}
        deleteTask={deleteTask}
        schedule={schedule}
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
      />
    </div>
  )
}
