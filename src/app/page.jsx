'use client'
import { useSelector } from 'react-redux'
import { HomepageCard } from './components/HomepageCard'
import { HomepageActions } from './components/HomepageActions'
import OpenAI from "openai";
import { useEffect } from 'react';

export default function Home() {
  const user = useSelector(state => state.userModule.user)



  return (

    <div className="flex overflow-y-auto flex-col justify-start items-center pb-10 w-full h-full sm:p-20">
      <div className="flex flex-col items-center w-[60%] max-sm:w-full">

        <p className="flex mt-12 xl:mt-5 mb-4 text-[#B6BBC3] max-sm:text-base text-xl w-max capitalize">
          Hello {user?.name?.split(' ').slice(0, 1)} 👋
        </p>
        <h1 className="flex flex-col mb-14 w-full text-5xl font-bold text-center max-sm:text-3xl text-black/80">
          Own your day.
          <br /> Plan with purpose, achieve with{' '}
          <span className="text-green-500 underline">ease.</span>
        </h1>
        {/* <HomepageCard /> */}
        <button className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Get Started
        </button>

        {/* <HomepageActions /> */}
      </div>
    </div>
  )
}
