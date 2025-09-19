"use client"

import { useMemo, useState } from "react"
import { Loader2 } from "lucide-react"
import TaskPreview from "@/components/tasks/TaskPreview"
import EmptyState from "./EmptyState"
import FormWrapper from "@/components/FormWrapper"
import { fetchGoogleCalendarEvents } from "@/services/calendar.service"
import { useDispatch, useSelector } from "react-redux"
import { SET_GOOGLE_EVENTS } from "@/store/reducers/schedule.reducer"

interface EventItem {
    id: string;
    summary: string;
    start: string;
    end: string;
}

export function GoogleCalendarFetchStep() {
    const dispatch = useDispatch()
    const googleEvents = useSelector((state: any) => state.scheduleModule.multiStepForm.googleEvents)

    const [date, setDate] = useState<Date | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    // Local date formatter to avoid UTC shifting
    const toLocalYMD = (d: Date) => {
        const yr = d.getFullYear()
        const mo = String(d.getMonth() + 1).padStart(2, '0')
        const da = String(d.getDate()).padStart(2, '0')
        return `${yr}-${mo}-${da}`
    }

    async function onFetch() {
        setLoading(true)
        try {
            const day = toLocalYMD(date ?? new Date())
            const fetched = await fetchGoogleCalendarEvents(day)
            const items: EventItem[] = (fetched || []).map((ev) => ({
                id: ev.id,
                summary: ev.title || 'Untitled event',
                start: ev.start || '',
                end: ev.end || '',
            }))
            dispatch({ type: SET_GOOGLE_EVENTS, googleEvents: items })
        } catch (err) {
            console.error('Failed to fetch Google Calendar events:', err)
            dispatch({ type: SET_GOOGLE_EVENTS, googleEvents: [] })
        } finally {
            setLoading(false)
        }
    }

    const formattedDate = useMemo(() => (
        date ? toLocalYMD(date) : ""
    ), [date])

    return (
        <FormWrapper
            title="Connect Your Google Calendar"
            description="Import your calendar events so we can include them in your schedule and avoid conflicts."
        >
            <div className="flex flex-col md:flex-row items-end gap-3 w-full">
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
                            className="w-full flex justify-end text-end sm:w-[220px] px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onFetch}
                    disabled={loading}
                    className="inline-flex whitespace-nowrap w-full items-center justify-start gap-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed dark:hover:bg-gray-700 transition-colors"
                >
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <img src="/google-icon-logo-svgrepo-com.svg" alt="Google" className="h-5 w-5" />
                    )}
                    {loading ? 'Fetching...' : 'Fetch Google Calendar Events'}
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fetched Events {googleEvents.length > 0 && `(${googleEvents.length})`}
                    </h2>
                </div>

                {googleEvents.length === 0 ? (
                    <EmptyState message="No events yet. Choose a date and fetch your Google Calendar events." />
                ) : (
                    <div className="grid grid-cols-1 gap-3 w-full overflow-y-auto max-h-[320px] pb-2 scrollbar-hidden">
                        {googleEvents.map((ev: EventItem) => (
                            <TaskPreview
                                key={ev.id}
                                task={{ id: ev.id, title: ev.summary, start: ev.start, end: ev.end }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </FormWrapper>
    )
}

export default GoogleCalendarFetchStep
