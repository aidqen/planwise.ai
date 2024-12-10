import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Inter } from '@next/font/google'

export const metadata = {
  title: 'planwise',
  description: 'Enhance your productivity with AI integrated to Google Calendar!',
}

const inter = Inter({
  subsets: ['latin'], // Loads characters for most Western languages
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Includes all weights
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`font-[inter]`}>{children}</body>
    </html>
  )
}
