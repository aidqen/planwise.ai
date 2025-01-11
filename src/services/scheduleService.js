import axios from "axios"

export const scheduleService = {
  fetchAiSchedule,
  fetchUserTimezone,
  sendTasksToCalendar,
  insertScheduleToDB,
  getScheduleById,
  updateSchedule,
  streamScheduleChanges,
  updateScheduleWithChanges,
  saveChat,
  getEditedSchedule
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
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error updating schedule:', error)
    throw error
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

async function sendTasksToCalendar(schedule, date, timezone) {
  try {
    const response = await axios.post("/api/google-calendar/add-task", {
      schedule,
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

async function streamScheduleChanges(message, schedule) {
  try {
    // Only include essential schedule data
    const minimalSchedule = {
      _id: schedule._id,
      preferences: schedule.preferences,
      schedule: schedule.schedule
    };

    // Convert the message and minimal schedule to URL-safe strings
    const params = new URLSearchParams({
      message: message,
      schedule: JSON.stringify(minimalSchedule)
    });

    const response = await fetch(`/api/schedule/chat/stream?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    return {
      stream: reader,
      decoder,
      cancel: () => reader.cancel()
    };
  } catch (error) {
    console.error('Error streaming schedule changes:', error);
    throw error;
  }
}

async function updateScheduleWithChanges(message, schedule, explanation) {
  try {
    const response = await fetch('/api/schedule/chat/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, schedule, explanation }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.updatedSchedule;
  } catch (error) {
    console.error('Error updating schedule with changes:', error);
    throw error;
  }
}

async function saveChat(scheduleId, chat) {
  try {
    const response = await fetch('/api/schedule/chat/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduleId, chat }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving chat:', error);
    throw error;
  }
}

async function getEditedSchedule(schedule, explanation) {
  try {
    const response = await fetch('/api/schedule/chat/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scheduleData: schedule,
        explanation
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get edited schedule');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting edited schedule:', error);
    throw error;
  }
}
