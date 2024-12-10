'use client'
import { getUserSession } from "@/lib/session";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
    fetchCalendar()
  }, [])
  
  async function fetchUser() {
    const user = await getUserSession()
    setUser(user)
  }

  async function fetchCalendar() {
    const response = await fetch("/api/calendar-events");
    const data = await response.json()
    console.log('data:', data)
  }
  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {JSON.stringify(user)}
    </div>
  );
}
