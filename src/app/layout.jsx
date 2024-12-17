import './globals.css'
import { AppHeader } from './components/AppHeader'
import { ReduxProvider } from '@/components/ReduxProvider'
import { Poppins } from '@next/font/google'

export const metadata = {
  title: 'Planwise AI',
  description: 'Enhance your productivity with AI integrated to Google Calendar!',
  icons: {
    icon: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1733918185/icon_1_ylom72.png',
  },
}

const poppins = Poppins({
  subsets: ['latin'], // Loads characters for most Western languages
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Includes all weights
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={`h-screen w-screen bg-mainLight font-[poppins]`}>
        <main className="pt-10 px-6 w-full h-full flex flex-col items-center">
          <ReduxProvider>
            <AppHeader />
            {children}
          </ReduxProvider>
        </main>
      </body>
    </html>
  )
}
