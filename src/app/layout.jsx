import './globals.css'
import { AppHeader } from './components/AppHeader'
import { ReduxProvider } from '@/components/ReduxProvider'
import { Poppins } from 'next/font/google';
import { SidebarDemo } from '@/components/MainSidebar';
import { ToggleSidebarBtn } from '@/components/ToggleSidebarBtn';

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
    <html lang="en" className={`h-full ${poppins.className}`}>
      <body className={`grid flex-col grid-rows-1 h-full min-h-screen max-h-screen grid-cols-[auto_1fr] min-w-screen max-w-screen bg-mainLight font-[poppins] max-sm:flex`}>
        {/* <div className="overflow-y-auto w-full h-full"> */}
          <ReduxProvider>
            <SidebarDemo />
            <main className="flex overflow-y-auto flex-col col-start-2 row-start-1 items-center pt-10 h-full">
              <AppHeader />
              {children}
            </main>
          </ReduxProvider>
        {/* </div> */}
      </body>
    </html>
  )
}
