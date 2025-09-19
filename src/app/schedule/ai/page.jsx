'use client'

// import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScheduleStructure } from './components/ScheduleStructure'
import { SaveToCalendarBtn } from './components/SaveToCalendarBtn'
import { AddScheduleDialog } from './components/AddScheduleDialog'
import { TaskDialog } from './components/TaskDialog'
import { scheduleService } from '@/services/schedule.service'
import { TaskList } from './components/TaskList'
import { ScheduleSidebar } from './components/ScheduleSidebar/ScheduleSidebar'
import { Loading } from './components/Loading'
import { DesktopActions } from './components/DesktopActions'
import { getMinutesFromMidnight } from '@/services/util.service'
import { Button } from '@/components/ui/button'
import { EditableTitle } from './components/EditableTitle'
import { ScheduleActionButtons } from './components/ScheduleActionButtons'
import { useToast } from "@/components/hooks/use-toast"
import { deleteSchedule, updateSchedule } from '@/store/actions/schedule.actions'
import { updateScheduleInUser } from '@/store/actions/user.actions'
import { MultiStepForm } from '@/components/custom/multistepform/MultiStepForm'
import { Plus } from 'lucide-react'

const DEFAULT_SCHEDULE = {
  schedule: [],
  preferences: {
    wakeup: '04:00'
  }
}

export default function DailySchedule() {
  // const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isCreateTask, setIsCreateTask] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editedSchedule, setEditedSchedule] = useState(null)
  const [showOriginal, setShowOriginal] = useState(false)
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE)
  // const schedule = useSelector(state => state.scheduleModule.schedule)
  const wakeupTime = editedSchedule?.preferences?.wakeup || schedule?.preferences?.wakeup || '04:00'
  const wakeupMinutes = getMinutesFromMidnight(wakeupTime)
  const { toast } = useToast();

  const isNew = useMemo(() => searchParams?.get('new') === 'true', [searchParams])
  const scheduleId = useMemo(() => searchParams?.get('id') || null, [searchParams])

  useEffect(() => {
    if (scheduleId) {
      onFetchSchedule(scheduleId)
    }
  }, [scheduleId])

  const onFetchSchedule = async (id) => {
    console.log('Fetching schedule by id from query:', id)
    try {
      if (id !== 'new') setIsLoading(true)
      if (id === 'loading' || id === 'new') {
        return
      }

      const fetchedSchedule = await scheduleService.getScheduleById(id)
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
    setEditedSchedule({...schedule, schedule: newSchedule})
  }

  const handleAcceptChanges = async () => {
    try {
      setSchedule(editedSchedule)
      await scheduleService.updateSchedule(editedSchedule)
      setEditedSchedule(null)
    } catch (error) {
      console.error('Failed to accept changes:', error)
    } finally {
      setShowOriginal(false)
    }
  }

  const handleRejectChanges = () => {
    setEditedSchedule(null)
    setShowOriginal(false)
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

  async function onSaveSchedule(property, value) {
    const oldSchedule = { ...schedule };
    try {
      const newSchedule = { ...oldSchedule, [property]: value };
      setSchedule(newSchedule);
      await updateSchedule(newSchedule);
      await updateScheduleInUser(newSchedule)
      toast({
        title: "Success",
        description: "Changes saved successfully",
      });
    } catch (error) {
      setSchedule(oldSchedule);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes. Please try again.",
      });
      console.error('Failed to save schedule:', error);
    }
  }

  async function onDeleteSchedule() {
    try {
      await deleteSchedule(schedule._id)
      router.replace('/schedule/all')
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete schedule. Please try again.",
      })
    }
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] pt-16 md:pt-0 overflow-y-hidden justify-between items-center w-full">
      <ScheduleSidebar
        schedule={schedule}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setSchedule={setSchedule}
        onScheduleEdit={handleScheduleEdit}
        isEditedSchedule={!!editedSchedule}
        onSaveSchedule={onSaveSchedule}
      />
      {isNew && <MultiStepForm />}
      {(isLoading || !schedule?.schedule?.length) ? (
        <Loading />
      ) : (
        <Card className="overflow-y-auto relative mx-auto w-[95%] h-[95%] bg-transparent border-none md:pt-16 scrollbar rounded-2xl">
          <div className="mx-auto ps-8 w-full md:w-[90%] relative">
            <CardHeader className="pt-0 pe-1.5">
              <div className="flex justify-between items-center">
                  <EditableTitle
                    title={schedule?.name || "Daily Schedule"}
                    onSave={onSaveSchedule}
                  />
                <div className="hidden gap-4 md:flex">
                  <DesktopActions
                    onCreateTask={onCreateTask}
                    onDeleteSchedule={onDeleteSchedule}
                  />
                </div>
                <Button
                  onClick={onCreateTask}
                  className="w-10 h-10 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg transition-all duration-200 md:hidden hover:shadow-blue-500/20 hover:scale-105 dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-400"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="relative h-[1640px] w-full border-l-2 border-gray-300 dark:border-gray-600 pl-8 pr-4">
                <ScheduleStructure wakeupMinutes={wakeupMinutes} />
                <TaskList
                  tasks={editedSchedule && !showOriginal ? editedSchedule.schedule : schedule.schedule}
                  wakeupMinutes={wakeupMinutes}
                  handleTaskClick={handleTaskClick}
                />
              </div>

              {editedSchedule && (
                <ScheduleActionButtons
                  showOriginal={showOriginal}
                  setShowOriginal={setShowOriginal}
                  handleRejectChanges={handleRejectChanges}
                  handleAcceptChanges={handleAcceptChanges}
                />
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
    </div>
  )
}
