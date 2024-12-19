'use client'

import { format, parseISO } from 'date-fns'
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

export default function DailySchedule({}) {
  const aiSchedule = useSelector(state => state.scheduleModule.aiSchedule)
  console.log('aiSchedule:', aiSchedule)
  // const [selectedDate, setSelectedDate] = useState('12/12')
  const tasks = [
    {
      id: 1,
      summary: 'Workout',
      description: 'Morning workout session',
      start: '2024-12-18T07:30:00-07:00',
      end: '2024-12-18T08:30:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    {
      id: 2,
      summary: 'Morning Meeting',
      description: 'Team catch-up meeting',
      start: '2024-12-18T10:00:00-07:00',
      end: '2024-12-18T11:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    {
      id: 3,
      summary: 'Read a Book',
      description: 'Reading a chapter from the latest book',
      start: '2024-12-18T11:15:00-07:00',
      end: '2024-12-18T12:15:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    {
      id: 4,
      summary: 'Lunch Break',
      description: 'Relax and have lunch',
      start: '2024-12-18T13:00:00-07:00',
      end: '2024-12-18T14:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    {
      id: 5,
      summary: 'Work on Side Project',
      description: 'Focusing on personal development project',
      start: '2024-12-18T14:30:00-07:00',
      end: '2024-12-18T16:30:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    {
      id: 6,
      summary: 'Evening Walk',
      description: 'Relaxing evening walk',
      start: '2024-12-18T18:00:00-07:00',
      end: '2024-12-18T19:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
  ]

  const sortedTasks = [...tasks]?.sort((a, b) => a.start?.localeCompare(b.start))
  if (!aiSchedule?.length) return <div>Loading...</div>
  return (
    <Card className="w-full max-w-4xl ps-10 mx-auto overflow-y-auto bg-transparent border-none">
      <CardHeader className="flex flex-col items-start justify-between pb-6 gap-1">
        <CardTitle className="text-xl font-medium">Daily Schedule</CardTitle>
        <CardDescription className="text-base max-sm:text-sm text-black/60">Here&apos;s your AI generated schedule for today</CardDescription>
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover> */}
      </CardHeader>
      <CardContent>
      <div className="relative h-[1440px] border-l-2 border-gray-300">
        {Array.from({ length: 24 }).map((_, hour) => (
            <div
              key={hour}
              className="absolute left-0 w-full text-sm text-gray-400"
              style={{ top: `${(hour / 24) * 100}%` }}
            >
              <div className="absolute -left-16 w-12 text-right">
                {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
              </div>
              <div className="h-[1px] bg-gray-200" />
            </div>
          ))}
          {sortedTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TaskCard({ task }) {
  const startDate = parseISO(task.start)
  const endDate = parseISO(task.end)

  const startHours = startDate.getHours()
  const startMinutes = startDate.getMinutes()
  const endHours = endDate.getHours()
  const endMinutes = endDate.getMinutes()

  const startTotalMinutes = startHours * 60 + startMinutes
  const endTotalMinutes = endHours * 60 + endMinutes

  let duration = endTotalMinutes - startTotalMinutes
  if (duration < 0) {
    duration += 24 * 60 // Add 24 hours worth of minutes if task spans midnight
  }

  const top = (startTotalMinutes / (24 * 60)) * 100
  const height = (duration / (24 * 60)) * 100

  return (
    <Card
      className="absolute left-4 px-3 py-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.02] bg-secondary cursor-pointer text-white w-[100%]"
      style={{
        top: `${top}%`,
        height: `${height}%`,
        minHeight: '40px',
      }}
    >
      <CardHeader className="p-0 space-y-0 flex flex-col items-start gap-1">
        <CardTitle className="text-sm font-semibold">{task.summary}</CardTitle>
        <CardDescription className="text-xs mt-0 truncate">
          {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

// function getMinutesFromMidnight(time) {
//   const [hours, minutes] = time?.split(':').map(Number)
//   return hours * 60 + minutes
// }
