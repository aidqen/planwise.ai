import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const prisma = new PrismaClient()

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
            scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly",
        },
    },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log('profile:', profile)
      if (!profile?.email) {
        throw new Error('no profile');
      }

      try {
        const result = await prisma.user.upsert({
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
        console.log('Upsert result:', result);
    } catch (error) {
        console.error('Error writing to database:', error);
        throw new Error('Database error');
    }
    return true;
    },
    async session({ session, token }) {
      // Add additional user info to the session
      session.user = {
        ...session.user,
        id: token.sub, // Add user's unique ID from token
        name: token.name,
        email: token.email,
      };
      return session;
    },
    async jwt({ token, user }) {
      // Add additional user info to the JWT token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}
