import './globals.css'
import { AppHeader } from './components/AppHeader'
import { ReduxProvider } from '@/components/ReduxProvider'
import { Poppins } from 'next/font/google';
import { SidebarDemo } from '@/components/MainSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeClientWrapper } from '@/components/ThemeClientWrapper';
import { Toaster } from "@/components/ui/toaster"

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
      <body className={`grid flex-col grid-rows-1 min-h-dvh max-h-dvh md:max-h-screen md:min-h-screen grid-cols-[auto_1fr] md:min-w-screen md:max-w-screen bg-mainLight dark:bg-gray-900 font-[poppins] max-sm:flex`}>
        <ReduxProvider>
          <TooltipProvider delayDuration={0}>
            <ThemeClientWrapper>
              <SidebarDemo />
              <main className="flex overflow-y-hidden flex-col col-start-2 row-start-1 items-center pt-4 h-full md:pt-0">
                <div className="hidden absolute inset-0 bg-gradient-to-b to-transparent pointer-events-none dark:block from-blue-50/50 via-blue-50/25 dark:from-blue-950/20 dark:via-blue-950/10 dark:to-transparent" />
                <AppHeader />
                {children}
              </main>
              <Toaster />
            </ThemeClientWrapper>
          </TooltipProvider>
        </ReduxProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
