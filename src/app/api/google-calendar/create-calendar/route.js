import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

async function createCustomCalendar(accessToken) {
    const session = getServerSession(authOptions)
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session?.accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const newCalendar = {
    summary: 'AI Calendar',
    timeZone: "Asia/Jerusalem", // Adjust as needed
  };

  try {
    const response = await calendar.calendars.insert({
      resource: newCalendar,
    });

    console.log("Custom Calendar Created:", response.data);
    return response.data.id; // This is the ID of the new calendar
  } catch (error) {
    console.error("Error creating custom calendar:", error);
    throw error;
  }
}
