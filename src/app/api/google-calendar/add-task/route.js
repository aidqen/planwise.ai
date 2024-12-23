import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export async function POST(req) {
  try {
    const { summary, description, startDateTime, endDateTime } = await req.json();

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Jerusalem", // Adjust to your time zone
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Jerusalem",
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    return new Response(
      JSON.stringify({
        success: true,
        eventLink: response.data.htmlLink,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding event to Google Calendar:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
