export const scheduleService = {
    fetchAiSchedule
}

async function fetchAiSchedule(parameters) {
    try {
      const res = await fetch('/api/generate-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parameters),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log('Response:', data);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Request Failed:', error);
    }
}