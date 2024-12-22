'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUser } from '@/store/actions/user.actions'
import { CalendarDays, Component, LogOut, Search } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function AppHeader() {
  const user = useSelector(state => state.userModule.user)
  const pathname = usePathname()
  
  const [isVisible, setIsVisible] = useState(false)

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
    signOut({ callbackUrl: '/auth/login'})
  }

  // async function fetchCalendar() {
  //   const response = await fetch("/api/calendar-events");
  //   const data = await response.json()
  // }
  return (
    <header
      className={`${
        isVisible ? '' : 'hidden'
      } pb-3 flex flex-row w-full items-center justify-between`}
    >
      <button className="flex justify-center items-center p-2 rounded-full bg-secondaryLight shadow-md">
        <Component className="text-black" />
      </button>
      <div className="flex flex-row items-center gap-8">
        <button className="flex justify-center items-center p-2 rounded-full bg-secondaryLight border shadow-md">
          <Search className="text-black" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={
                user?.image ||
                'https://res.cloudinary.com/di6tqrg5y/image/upload/v1733919613/random_person_vzka45.jpg'
              }
              alt="User avatar"
              width={35}
              height={35}
              className="rounded-full shadow-md"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onLogout}>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CalendarDays />
                <span className="whitespace-nowrap">Previous Schedules</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
