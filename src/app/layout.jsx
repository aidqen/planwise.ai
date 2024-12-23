import './globals.css'
import { AppHeader } from './components/AppHeader'
import { ReduxProvider } from '@/components/ReduxProvider'
import { Poppins } from 'next/font/google';
import { SidebarDemo } from '@/components/MainSidebar';

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
        <div className="grid grid-cols-[auto_1fr]  w-full h-full  overflow-y-auto">
          <ReduxProvider>
            <SidebarDemo />
            <main className="pt-10  flex flex-col items-center w-full col-start-2">
              <AppHeader />
              {children}
            </main>
          </ReduxProvider>
        </div>
      </body>
    </html>
  )
}
