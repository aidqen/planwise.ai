import { getCalendarEvents, getUserSession } from "@/lib/session"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req) {
  const session = await getUserSession()

  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
    })
  }

  try {
    const events = await getCalendarEvents(session.accessToken)
    console.log('session.accessToken:', session.accessToken)
    return new Response(JSON.stringify(events), { status: 200 })
  } catch (error) {
    console.error('Failed to fetch calendar events:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
    })
  }
}
