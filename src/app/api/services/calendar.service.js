import { google } from "googleapis"
import { getToken } from "./googleAuth.service"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const buildCalendarClient = (accessToken) => {
  if (!accessToken) {
    const err = new Error("Missing Google access token")
    err.code = 401
    throw err
  }

  const auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
  auth.setCredentials({ access_token: accessToken })
  return google.calendar({ version: "v3", auth })
}

const isUnauthorizedError = (error) => {
  if (!error) return false
  const status = error.code ?? error?.response?.status
  return status === 401
}

async function withCalendarClient(handler) {
  const initialToken = await getToken()
  const calendar = buildCalendarClient(initialToken.accessToken)

  try {
    return await handler(calendar, initialToken)
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      throw error
    }

    const refreshedToken = await getToken({ forceRefresh: true })
    const refreshedCalendar = buildCalendarClient(refreshedToken.accessToken)
    return handler(refreshedCalendar, refreshedToken)
  }
}

const formatHHMM = (iso, timeZone) => {
  if (!iso) return null
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return null
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    })
    return fmt.format(d)
  } catch {
    return null
  }
}

const mapEvent = (event, timeZone, calendarId) => ({
  id: event.id,
  title: event.summary ?? "",
  start: event.start?.dateTime
    ? formatHHMM(event.start.dateTime, timeZone)
    : event.start?.date
    ? "00:00"
    : null,
  end: event.end?.dateTime
    ? formatHHMM(event.end.dateTime, timeZone)
    : event.end?.date
    ? "23:59"
    : null,
  location: event.location ?? null,
  attendees: event.attendees ?? [],
  hangoutLink: event.hangoutLink ?? null,
  calendarId,
})

export async function fetchGoogleCalendarEventsByDate(date) {
  if (!date) {
    throw new Error("date is required (YYYY-MM-DD)")
  }

  return withCalendarClient(async (calendar) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"

    const start = new Date(`${date}T00:00:00`)
    const end = new Date(`${date}T23:59:59`)

    const { data } = await calendar.events.list({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      timeZone,
      maxResults: 50,
    })

    const primaryEvents = (data.items ?? []).map((event) =>
      mapEvent(event, timeZone, "primary")
    )

    const userCalendars = await fetchUserCalendars(calendar)
    const calendarIds = Array.from(
      new Set(["primary", ...userCalendars.map((c) => c.id)])
    )

    const otherIds = calendarIds.filter((id) => id !== "primary")

    const fetchCalendarItems = async (calendarId) => {
      const items = []
      let pageToken
      do {
        const { data: page } = await calendar.events.list({
          calendarId,
          singleEvents: true,
          orderBy: "startTime",
          timeMin: start.toISOString(),
          timeMax: end.toISOString(),
          timeZone,
          maxResults: 100,
          pageToken,
        })
        items.push(...(page.items || []))
        pageToken = page.nextPageToken || undefined
      } while (pageToken)

      return items.map((event) => mapEvent(event, timeZone, calendarId))
    }

    const otherEventsArrays = await Promise.all(
      otherIds.map(async (id) => {
        try {
          return await fetchCalendarItems(id)
        } catch (err) {
          console.warn(`Failed to fetch events for calendar ${id}:`, err?.message || err)
          return []
        }
      })
    )

    const allEvents = [...primaryEvents, ...otherEventsArrays.flat()]

    const seen = new Set()
    const deduped = []

    for (const event of allEvents) {
      if (!event?.id) continue
      if (seen.has(event.id)) continue
      seen.add(event.id)
      deduped.push(event)
    }

    const toMillis = (time) => {
      if (!time) return 0
      const parsed = new Date(`${date}T${time}`)
      return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime()
    }

    deduped.sort((a, b) => toMillis(a.start) - toMillis(b.start))

    return deduped
  })
}

// List the user's calendars (primary, birthdays, holidays if visible)
export async function fetchUserCalendars(calendarInstance) {
  const listCalendars = async (calendar) => {
    const { data } = await calendar.calendarList.list({ maxResults: 250 })
    return (data.items ?? []).map((calendar) => ({
      id: calendar.id,
      summary: calendar.summary || "",
      primary: Boolean(calendar.primary),
      selected: calendar.selected !== false,
      accessRole: calendar.accessRole,
      backgroundColor: calendar.backgroundColor || null,
      foregroundColor: calendar.foregroundColor || null,
    }))
  }

  if (calendarInstance) {
    return listCalendars(calendarInstance)
  }

  return withCalendarClient((calendar) => listCalendars(calendar))
}
