'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { getUser } from '@/store/actions/user.actions'
import { TOGGLE_SIDEBAR } from '@/store/reducers/system.reducer'
import { Component, LogOut, PanelRight, Search, MessageCircle } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function AppHeader() {
  const user = useSelector(state => state.userModule.user)
  console.log("🚀 ~ file: AppHeader.jsx:22 ~ user:", user)
  const pathname = usePathname()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  
  const [isVisible, setIsVisible] = useState(false)
  const isSchedulePage = pathname.includes('schedule/ai/')

  useEffect(() => {
    if (pathname.includes('auth')) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [pathname, isVisible])

  useEffect(() => {
    getUser()
  }, [])

  function onLogout() {
    signOut({ callbackUrl: '/auth'})
  }

  function onToggleSidebar() {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  function onToggleChat() {
    dispatch({ type: 'TOGGLE_SCHEDULE_SIDEBAR' })
  }

  if (!isMobile) return null;

  return (
    <header
      className={cn(
        isVisible ? 'flex':'hidden', 
        'flex-row justify-between items-center w-full ps-3 pe-6 max-sm:justify-between fixed top-0 left-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-3 z-50'
      )}
    >
      <button 
        className="flex justify-center items-center p-2 rounded-full shadow-md bg-secondaryLight dark:bg-gray-800 dark:shadow-gray-900/30"
        onClick={onToggleSidebar}
      >
        <Component className="text-black dark:text-gray-200" />
      </button>
      <div className="flex flex-row gap-4 items-center">
        {isSchedulePage && (
          <button 
            className="flex justify-center items-center p-2 text-white bg-blue-500 rounded-full shadow-md transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-gray-900/30"
            onClick={onToggleChat}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        )}
        {/* <button className="flex justify-center items-center p-2 rounded-full border shadow-md bg-secondaryLight dark:bg-gray-800 dark:border-gray-700">
          <Search className="text-black dark:text-gray-200" />
        </button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={user?.image || 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1733919613/random_person_vzka45.jpg'}
              alt="User avatar"
              width={35}
              height={35}
              className="rounded-full shadow-md cursor-pointer dark:shadow-gray-900/30"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-200 w-50 dark:bg-gray-800/95 dark:border-gray-700">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onLogout} className="text-gray-700 cursor-pointer dark:text-gray-200 hover:text-black/60 dark:hover:text-gray-100 dark:hover:bg-gray-700/50">
                <LogOut className="mr-2 w-4 h-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
