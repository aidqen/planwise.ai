'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function getUserSession() {
  const session = await getServerSession(authOptions)
  return session?.user || null
}

export async function getCalendarEvents(accessToken) {
  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`)
  }

  const data = await response.json()
  return data.items 
}
