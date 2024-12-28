import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { convertToGoogleTimestamp } from "@/services/util.service";
import { refreshAccessToken } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    // Get session data
    const session = await getServerSession(authOptions);
    console.log("🚀 ~ Session:", session);

    if (!session || !session.accessToken) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No access token" }),
        { status: 401 }
      );
    }

    // Check for token expiration and refresh if necessary
    if (session.expiresAt && Date.now() / 1000 > session.expiresAt) {
      console.log("Access token expired, refreshing...");
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
    const { aiSchedule, date, timezone } = await req.json();
    console.log("🚀 ~ Timezone:", timezone);
    console.log("🚀 ~ Date:", date);

    // Validate input
    if (!Array.isArray(aiSchedule) || !date || !timezone) {
      return new Response(
        JSON.stringify({ error: "Invalid input: Missing required fields" }),
        { status: 400 }
      );
    }

    console.log("🚀 ~ Access Token:", session.accessToken);

    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Insert tasks into Google Calendar
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
    console.log("🚀 ~ Task Results:", taskResults);
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
