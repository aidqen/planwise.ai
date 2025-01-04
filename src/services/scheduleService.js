import axios from "axios"

export const scheduleService = {
  fetchAiSchedule,
  fetchUserTimezone,
  sendTasksToCalendar,
  insertScheduleToDB,
  getScheduleById,
  updateSchedule
}

async function getScheduleById(id) {
  try {
    const response = await fetch(`/api/schedule/getById/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
      }
    )
    return response.json()
  } catch (error) {
    console.error('Error fetching schedule:', error)
  }
}

async function updateSchedule(schedule) {
  try {
    const response = await fetch('/api/schedule/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    })
    return response.json()
  } catch (error) {
    console.error('Error updating schedule:', error)
  }
}

async function fetchAiSchedule(parameters) {
  try {
    const res = await fetch('/api/generate-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parameters),
    });

    return res.json();
  } catch (error) {
    console.error('Request Failed:', error);
  }
}


async function insertScheduleToDB(schedule) {
  try {
    const response = await fetch('/api/schedule/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || "Failed to add schedule to the database")
    }
    return data.data
  } catch (error) {
    console.error("Failed to add schedule to the database:", error)
    throw error
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

async function sendTasksToCalendar(aiSchedule, date, timezone) {
  try {
    const response = await axios.post("/api/google-calendar/add-task", {
      aiSchedule,
      date,
      timezone,
    });

    return response.data; // Contains insertedTasks and failedTasks
  } catch (error) {
    if (error.response) {
      console.error("Failed to add tasks:", error.response.data);
      throw new Error(error.response.data.error || "Failed to add tasks to Google Calendar");
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network error occurred while adding tasks");
    }
  }
}
