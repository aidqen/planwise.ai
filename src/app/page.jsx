'use client'
import { useSelector } from 'react-redux'
import { HomepageCard } from './components/HomepageCard'
import { HomepageActions } from './components/HomepageActions'
import OpenAI from "openai";
import { useEffect } from 'react';

export default function Home() {
  const user = useSelector(state => state.userModule.user)

  useEffect(() => {
    handleGetRequest()
  }, [])
  

  const handleGetRequest = async () => {
    try {
      const res = await fetch('/api/test-gpt', { method: 'POST' });
      const data = await res.json();

      if (res.ok) {
        console.log('GET Response:', data);
      } else {
        console.error('GET Error:', data.error);
      }
    } catch (error) {
      console.error('GET Request Failed:', error);
    }
  };


  console.log('user:', user)
  return (

      <div className="flex flex-col overflow-y-auto h-full w-full items-center justify-start sm:p-20 pb-10">
        <p className="mt-12 xl:mt-5 mb-4 text-[#B6BBC3] max-sm:text-base text-xl w-max capitalize">
          Hello {user?.name?.split(' ').slice(0, 1)} 👋
        </p>
        <h1 className="xl:text-5xl max-sm:text-3xl text-black/80 text-center font-bold mb-14">
          Own your day.
          <br /> Plan with purpose, achieve with{' '}
          <span className="text-green-500 underline">ease.</span>
        </h1>
        <HomepageCard />
        <HomepageActions />
      </div>
  )
}
