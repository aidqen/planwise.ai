'use client'
import { getUserSession } from '@/lib/session'
import { getUser } from '@/store/actions/user.actions'
import { Component, Search } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function AppHeader() {
  const user = useSelector(state => state.userModule.user)
  const pathname = usePathname()
  console.log('searchParams:', pathname.includes('auth'))
  const [isVisible, setIsVisible] = useState(false);
  

  useEffect(() => {
    console.log('isVisible' , isVisible);
    
    if (pathname.includes('auth')) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [pathname, isVisible])
  

  useEffect(() => {
    getUser()
  }, [])
  

  // async function fetchCalendar() {
  //   const response = await fetch("/api/calendar-events");
  //   const data = await response.json()
  // }
  return (
    <header className={`${isVisible ? '' : 'hidden'} flex flex-row w-full items-center justify-between`}>
      <button className="flex justify-center items-center p-2 rounded-full bg-secondaryLight shadow-md">
        <Component className="text-black" />
      </button>
      <div className="flex flex-row items-center gap-8">
        <button className="flex justify-center items-center p-2 rounded-full bg-secondaryLight border shadow-md">
          <Search className="text-black" />
        </button>
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
      </div>
    </header>
  )
}
