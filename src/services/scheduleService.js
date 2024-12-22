export const scheduleService = {
  fetchAiSchedule,
  fetchUserTimezone
}

async function fetchAiSchedule(parameters) {
  try {
    const res = await fetch('/api/generate-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parameters),
    })

    return await res.json()
  } catch (error) {
    console.error('Request Failed:', error)
  }
}

async function fetchUserTimezone() {
  try {
    const response = await fetch('https://ipapi.co/timezone/')
    return response.text()
  } catch (error) {
    console.error('Error fetching time zone:', error)
  }
}
