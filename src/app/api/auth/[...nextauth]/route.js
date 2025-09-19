
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { google } from "googleapis";
import { upsertUser } from '../../services/user.service';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Helper function to refresh access token
export async function refreshAccessToken(refreshToken) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    return {
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token ?? refreshToken, // Fallback to existing
      expiresAt: Math.floor(credentials.expiry_date / 1000), // Correct expiration
    };
  } catch (error) {
    console.error('Refresh token error:', error.message);
    return null;
  }
}

export const authOptions = {
  debug: true,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly',
          access_type: 'offline', // Ensure refresh_token is included
          prompt: 'consent', // Force consent to ensure refresh_token is provided
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
        // Upsert user in the database
        const user = await upsertUser(profile)

        // Attach the user ID to the token during sign-in
        account.userId = user.id;

        return true;
      } catch (error) {
        console.error("Database error:", error.message);
        throw new Error('Database error');
      }
    },
    async jwt({ token, account, profile, user }) {
      if (account) {
        // Initial sign-in: capture tokens from account
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // Ensure this is captured
        token.expiresAt = Math.floor(Date.now() / 1000) + account.expires_in;
        if (account.userId) token.id = account.userId;
      }
    
      // Check and refresh expired token
      if (token.expiresAt && Date.now() / 1000 > token.expiresAt) {
        if (!token.refreshToken) {
          throw new Error('Missing refresh token');
        }
        const refreshed = await refreshAccessToken(token.refreshToken);
        if (refreshed) {
          token.accessToken = refreshed.accessToken;
          token.refreshToken = refreshed.refreshToken ?? token.refreshToken;
          token.expiresAt = refreshed.expiresAt;
        } else {
          throw new Error('Failed to refresh token');
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Pass user data and tokens to the client
      session.user = {
        ...session.user,
        id: token.id, // Attach the MongoDB user ID
        name: token.name,
        email: token.email,
      };
      session.accessToken = token.accessToken; // Expose access token
      session.refreshToken = token.refreshToken; // Expose refresh token
      session.expiresAt = token.expiresAt; // Expose token expiration time

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
