import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { google } from "googleapis";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const prisma = new PrismaClient();

// async function createCustomCalendar(accessToken, calendarName) {
//   const oauth2Client = new google.auth.OAuth2();
//   oauth2Client.setCredentials({ access_token: accessToken });

//   const calendar = google.calendar({ version: "v3", auth: oauth2Client });

//   const newCalendar = {
//     summary: calendarName,
//     timeZone: "Asia/Jerusalem",
//   };

//   try {
//     const response = await calendar.calendars.insert({ resource: newCalendar });
//     console.log("Custom Calendar Created:", response.data);
//     return response.data.id;
//   } catch (error) {
//     console.error("Error creating custom calendar:", error);
//     throw error;
//   }
// }

async function refreshAccessToken(refreshToken) {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    return {
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token || refreshToken, // Keep the old refresh token if a new one isn't provided
      expiresAt: credentials.expiry_date / 1000, // Convert milliseconds to seconds
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar.events',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile email found');
      }

      try {
        await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
          },
          update: {
            name: profile.name,
          },
        });
      } catch (error) {
        console.error("Database error:", error);
        throw new Error('Database error');
      }

      return true;
    },
    async jwt({ token, account }) {
      // During initial sign-in, save tokens
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Math.floor(Date.now() / 1000) + account.expires_in; // Store token expiry time
      }

      // If the token is expired, refresh it
      if (token.expiresAt && Date.now() / 1000 > token.expiresAt) {
        console.log("Access token expired, refreshing...");
        const refreshedTokens = await refreshAccessToken(token.refreshToken);

        if (refreshedTokens) {
          token.accessToken = refreshedTokens.accessToken;
          token.refreshToken = refreshedTokens.refreshToken;
          token.expiresAt = refreshedTokens.expiresAt;
        } else {
          console.error("Failed to refresh access token");
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        name: token.name,
        email: token.email,
      };
      session.accessToken = token.accessToken; // Expose accessToken in the session

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
