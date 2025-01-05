'use client'
import { ToggleSidebarBtn } from '@/components/ToggleSidebarBtn'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { getUser } from '@/store/actions/user.actions'
import { TOGGLE_SIDEBAR } from '@/store/reducers/system.reducer'
import { Component, LogOut, PanelRight, Search } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function AppHeader() {
  const user = useSelector(state => state.userModule.user)
  const pathname = usePathname()
  const dispatch = useDispatch()
  
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

  function onToggleSidebar() {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  // async function fetchCalendar() {
  //   const response = await fetch("/api/calendar-events");
  //   const data = await response.json()
  // }
  return (
    <header
      className={cn(
        isVisible ? '':'hidden', 'flex flex-row justify-between items-center pb-3 w-full md:justify-end ps-3 pe-6 max-sm:justify-between'
        )
        }
    >
      
      <button className="flex justify-center items-center p-2 rounded-full shadow-md md:hidden bg-secondaryLight">
        <Component className="text-black" onClick={onToggleSidebar}/>
        {/* <Menu className="text-black"/> */}
      </button>
      <div className="flex flex-row gap-8 items-center">
        <button className="flex justify-center items-center p-2 rounded-full border shadow-md bg-secondaryLight">
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
              <DropdownMenuItem onClick={onLogout} className="cursor-pointer hover:text-black/60">
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
