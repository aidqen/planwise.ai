import { google } from "googleapis"
import { getToken } from "./googleAuth.service"

const buildCalendarClient = (accessToken) => {
  if (!accessToken) {
    throw new Error("Missing Google access token")
  }
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  auth.setCredentials({ access_token: accessToken })
  return google.calendar({ version: "v3", auth })
}

const isUnauthorizedError = (error) => {
  if (!error) return false
  const status = error.code ?? error?.response?.status
  return status === 401
}

export async function fetchGoogleCalendarEventsByDate(date) {
  if (!date) {
    throw new Error("date is required (YYYY-MM-DD)")
  }

  const execute = async (calendar) => {
    const start = new Date(`${date}T00:00:00`)
    const end = new Date(`${date}T23:59:59`)

    const { data } = await calendar.events.list({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      maxResults: 50,
    })

    return (data.items ?? []).map((event) => ({
      id: event.id,
      title: event.summary ?? "",
      start: event.start?.dateTime ?? event.start?.date ?? null,
      end: event.end?.dateTime ?? event.end?.date ?? null,
      location: event.location ?? null,
      attendees: event.attendees ?? [],
      hangoutLink: event.hangoutLink ?? null,
    }))
  }

  const token = await getToken()
  let calendar = buildCalendarClient(token.accessToken)

  try {
    return await execute(calendar)
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      throw error
    }
    const refreshed = await getToken({ forceRefresh: true })
    calendar = buildCalendarClient(refreshed.accessToken)
    return execute(calendar)
  }
}
