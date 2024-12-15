'use client'
import { useSelector } from "react-redux"
import { HomepageCard } from "./components/HomepageCard"
import { HomepageActions } from "./components/HomepageActions"

export default function Home() {
  const user = useSelector(state => state.userModule.user)
  console.log('user:', user)
  return (
    <div className="flex flex-col items-center justify-start sm:p-20 pb-10">
      <p className="mt-12 xl:mt-5 mb-4 text-[#B6BBC3] max-sm:text-base text-xl w-max capitalize">Hello {user?.name?.split(' ').slice(0, 1)} 👋</p>
      <h1 className="xl:text-5xl text-4xl text-black/80 text-center font-bold mb-14">Own your day.<br/> Plan with purpose, achieve with <span className="text-green-500 underline">ease.</span></h1>
      <HomepageCard />
      <HomepageActions />
    </div>
  )
}
