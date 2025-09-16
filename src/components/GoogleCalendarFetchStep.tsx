"use client"

import { useMemo, useState } from "react"
import { Calendar as CalendarIcon, Info, Loader2 } from "lucide-react"
import TaskPreview from "@/components/tasks/TaskPreview"
import EmptyState from "./EmptyState"
import FormWrapper from "@/components/FormWrapper"

type EventItem = {
    id: string
    title: string
    start: string // ISO string
    end: string   // ISO string
}

export function GoogleCalendarFetchStep() {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState<EventItem[]>([])

    async function onFetch() {
        setLoading(true)
        try {
            // Placeholder: simulate fetching Google Calendar events
            await new Promise((res) => setTimeout(res, 1200))

            const base = date ?? new Date()
            const dayISO = (d: Date) => new Date(d).toISOString()

            const mk = (offsetHoursStart: number, durationHours: number, idx: number): EventItem => {
                const start = new Date(base)
                start.setHours(offsetHoursStart, 0, 0, 0)
                const end = new Date(start)
                end.setHours(start.getHours() + durationHours)
                return {
                    id: `${base.getTime()}-${idx}`,
                    title: `Event ${idx + 1}`,
                    start: dayISO(start),
                    end: dayISO(end),
                }
            }

            const fetched: EventItem[] = [
                mk(9, 1, 0),
                mk(11, 2, 1),
                mk(15, 1, 2),
            ]

            setEvents(fetched)
        } finally {
            setLoading(false)
        }
    }

    const formattedDate = useMemo(() =>
        date ? new Date(date).toISOString().substring(0, 10) : "",
        [date]
    )

    return (
        <FormWrapper
            title="Connect Your Google Calendar"
            description="Import your calendar events so we can include them in your schedule and avoid conflicts."
        >
            <div className="flex flex-wrap items-end gap-3">
                        <div className="w-full sm:w-auto">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Select date
                            </label>
                            <div className="relative">

                                <input
                                    type="date"
                                    value={formattedDate}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setDate(value ? new Date(value + "T00:00:00") : undefined)
                                    }}
                                    className="w-full sm:w-[220px] pl-9 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onFetch}
                            disabled={loading}
                            className="inline-flex whitespace-nowrap items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed dark:hover:bg-gray-700 transition-colors"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <img src="/google-icon-logo-svgrepo-com.svg" alt="Google" className="h-5 w-5" />
                            )}
                            {loading ? 'Fetching…' : 'Fetch Google Calendar Events'}
                        </button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fetched Events {events.length > 0 && `(${events.length})`}
                    </h2>
                </div>

                {events.length === 0 ? (
                    <EmptyState message="No events yet. Choose a date and fetch your Google Calendar events." />
                ) : (
                    <div className="grid grid-cols-1 gap-3 w-full overflow-y-auto max-h-[320px] pb-2 scrollbar-hidden">
                        {events.map((ev) => (
                            <TaskPreview
                                key={ev.id}
                                task={{ id: ev.id, title: ev.title, start: ev.start, end: ev.end }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </FormWrapper>
    )
}

export default GoogleCalendarFetchStep
