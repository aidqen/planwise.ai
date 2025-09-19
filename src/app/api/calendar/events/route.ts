import { NextRequest, NextResponse } from "next/server"
import { fetchGoogleCalendarEventsByDate } from "../../services/calendar.service"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    console.log("🚀 ~ GET ~ url:", url)
    const date = url.searchParams.get("date")
    if (!date) {
      return NextResponse.json({ error: "Missing date query param (YYYY-MM-DD)" }, { status: 400 })
    }

    const events = await fetchGoogleCalendarEventsByDate(date)
    console.log("🚀 ~ GET ~ events:", events)
    return NextResponse.json(events, { status: 200 })
  } catch (err: unknown) {
    const anyErr = err as any
    const status = anyErr?.code === 401 ? 401 : 500
    const message = anyErr?.message || "Internal Server Error"
    return NextResponse.json({ error: message }, { status })
  }
}
