import axios from "axios"

export const scheduleService = {
  fetchAiSchedule,
  fetchUserTimezone,
  sendTasksToCalendar
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

async function sendTasksToCalendar(aiSchedule, date, timezone) {
  try {
    const response = await axios.post("/api/google-calendar/add-task", {
      aiSchedule,
      date,
      timezone,
    });

    console.log("Tasks added successfully:", response.data);
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
