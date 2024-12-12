'use client'
import { getUserSession } from '@/lib/session'
import { Component, Search } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function AppHeader() {
  const user = useSelector(state => state.userModule.user)

  // async function fetchCalendar() {
  //   const response = await fetch("/api/calendar-events");
  //   const data = await response.json()
  // }
  return (
    <header className="flex flex-row items-center justify-between">
      <div className="flex justify-center items-center p-2 rounded-full bg-secondaryLight shadow-md">
        <Component className="text-black" />
      </div>
      <div className="flex flex-row items-center gap-8">
        <div className="flex justify-center items-center p-2 rounded-full bg-secondaryLight shadow-md">
          <Search className="text-black" />
        </div>
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
