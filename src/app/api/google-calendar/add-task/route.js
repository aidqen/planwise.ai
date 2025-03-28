import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { convertToGoogleTimestamp } from "@/services/util.service";
import { refreshAccessToken } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    // Get session data
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No access token" }),
        { status: 401 }
      );
    }

    // Check for token expiration and refresh if necessary
    if (session.expiresAt && Date.now() / 1000 > session.expiresAt) {
      const refreshedTokens = await refreshAccessToken(session.refreshToken);

      if (refreshedTokens) {
        session.accessToken = refreshedTokens.accessToken;
        session.expiresAt = refreshedTokens.expiresAt;
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to refresh access token" }),
          { status: 401 }
        );
      }
    }

    // Parse request body
    const { schedule, date, timezone } = await req.json();
    console.log("🚀 ~ file: route.js:36 ~ timezone:", timezone)
    console.log("🚀 ~ file: route.js:36 ~ date:", date)

    // Validate input
    if (!Array.isArray(schedule) || !date || !timezone) {
      return new Response(
        JSON.stringify({ error: "Invalid input: Missing required fields" }),
        { status: 400 }
      );
    }

    // Initialize OAuth2 client with credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL
    );
    
    oauth2Client.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
      expiry_date: session.expiresAt * 1000
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Insert tasks into Google Calendar
    const taskResults = await Promise.all(
      schedule.map(async (task) => {
        try {
          const startTime = convertToGoogleTimestamp(date, task.start, timezone);
          const endTime = convertToGoogleTimestamp(date, task.end, timezone);

          const event = {
            summary: task.summary,
            description: task.description || "",
            start: {
              dateTime: startTime,
              timeZone: timezone,
            },
            end: {
              dateTime: endTime,
              timeZone: timezone,
            },
          };

          const response = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          return { success: true, event: response.data };
        } catch (error) {
          console.error(
            "Error inserting task:",
            task.summary,
            error.response?.data || error.message
          );
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
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500 }
    );
  }
}
