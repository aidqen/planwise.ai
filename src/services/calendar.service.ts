export type CalendarEvent = {
  id: string
  title: string
  start: string | null
  end: string | null
  location?: string | null
  attendees?: any[]
  hangoutLink?: string | null
}

export async function fetchGoogleCalendarEvents(date: string): Promise<CalendarEvent[]> {
  if (!date) throw new Error('date is required (YYYY-MM-DD)')
  const res = await fetch(`/api/calendar/events?date=${encodeURIComponent(date)}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const msg = body?.error || `Request failed with status ${res.status}`
    throw new Error(msg)
  }
  return res.json()
}
