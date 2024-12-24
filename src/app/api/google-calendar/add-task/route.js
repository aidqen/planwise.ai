import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { convertToGoogleTimestamp } from "@/services/util.service";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: No access token" }),
      { status: 401 }
    );
  }

  const { aiSchedule, date, timezone } = await req.json();

  // Validate the input
  if (!Array.isArray(aiSchedule) || !date || !timezone) {
    return new Response(
      JSON.stringify({ error: "Invalid input: Missing required fields" }),
      { status: 400 }
    );
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const taskResults = await Promise.all(
    aiSchedule.map(async (task) => {
      try {
        const startTime = convertToGoogleTimestamp(date, task.start, timezone);
        const endTime = convertToGoogleTimestamp(date, task.end, timezone);

        const event = {
          summary: task.summary,
          description: task.description || "",
          start: {
            dateTime: startTime,
            timeZone: task.timeZone || timezone,
          },
          end: {
            dateTime: endTime,
            timeZone: task.timeZone || timezone,
          },
        };

        const response = await calendar.events.insert({
          calendarId: "primary",
          resource: event,
        });

        return { success: true, event: response.data };
      } catch (error) {
        console.error("Error inserting task:", task.summary, error.message);
        return { success: false, error: error.message };
      }
    })
  );

  // Separate successful and failed tasks
  const successfulTasks = taskResults.filter((res) => res.success);
  const failedTasks = taskResults.filter((res) => !res.success);

  return new Response(
    JSON.stringify({
      success: true,
      insertedTasks: successfulTasks.map((res) => res.event),
      failedTasks,
    }),
    { status: 200 }
  );
}
