import { getServerSession } from 'next-auth'
import { google } from 'googleapis'
import { authOptions } from '../auth/[...nextauth]/route'

// Returns a valid Google access token, refreshing if necessary.
export async function getToken(options = {}) {
  const { forceRefresh = false } = options

  const session = await getServerSession(authOptions)
  if (!session) {
    const err = new Error('Not authenticated')
    err.code = 401
    throw err
  }

  const { accessToken, refreshToken, expiresAt } = session
  const nowSec = Math.floor(Date.now() / 1000)
  const safetyWindow = 60
  const hasExpiry = typeof expiresAt === 'number' && expiresAt > 0
  const shouldRefresh = forceRefresh || !accessToken || (hasExpiry && nowSec >= (expiresAt - safetyWindow))

  if (!shouldRefresh) {
    return {
      accessToken,
      refreshToken: refreshToken ?? null,
      expiresAt: hasExpiry ? expiresAt : null,
      refreshed: false,
    }
  }

  if (!refreshToken) {
    const err = new Error('Missing refresh token to refresh access')
    err.code = 401
    throw err
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  try {
    const { credentials } = await oauth2Client.refreshAccessToken()
    return {
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token ?? refreshToken,
      expiresAt: credentials.expiry_date ? Math.floor(credentials.expiry_date / 1000) : (hasExpiry ? expiresAt : null),
      refreshed: true,
    }
  } catch (error) {
    console.error('Failed to refresh Google access token:', error)
    const e = new Error('Google authorization expired or revoked. Please reconnect Google.')
    e.code = 401
    throw e
  }
}
