
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { google } from "googleapis";
import { upsertUser } from '../../services/user.service';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Helper function to refresh access token
export async function refreshAccessToken(refreshToken) {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    return {
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token || refreshToken, // Keep old refresh token if a new one isn't provided
      expiresAt: Math.floor(Date.now() / 1000) + credentials.expiry_date / 1000, // Expiry time in seconds
    };
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
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
          scope: 'openid email profile https://www.googleapis.com/auth/calendar.events',
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
      // Save tokens and user data during initial sign-in
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Math.floor(Date.now() / 1000) + account.expires_in; // Store token expiration time

        // Attach the MongoDB user ID from the database
        if (account.userId) {
          token.id = account.userId;
        }
      }

      // Check if the token has expired and refresh it
      if (token.expiresAt && Date.now() / 1000 > token.expiresAt) {
        const refreshedTokens = await refreshAccessToken(token.refreshToken);

        if (refreshedTokens) {
          token.accessToken = refreshedTokens.accessToken;
          token.refreshToken = refreshedTokens.refreshToken; // Update refresh token if new one is provided
          token.expiresAt = refreshedTokens.expiresAt;
        } else {
          console.error("Failed to refresh access token");
          throw new Error('Failed to refresh access token');
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
