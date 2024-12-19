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
  

  // const handleGetRequest = async () => {
  //   try {
  //     const res = await fetch('/api/test-gpt', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         preferences: { wakeTime: '07:00', sleepTime: '22:00', intensity: 'moderate' },
  //         routines: [
  //           { id: 1, title: 'Work', start: '9:00', end: '17:00' },
  //         ],
  //         goals: [
  //           { id: 1, title: 'Learn about indie hacking' },
  //           { id: 2, title: 'Look better' },
  //           { id: 3, title: 'Keep in touch with family or friends' },
  //         ],
  //       }),
  //     });
  
  //     const data = await res.json();
  
  //     if (res.ok) {
  //       console.log('Response:', data);
  //     } else {
  //       console.error('Error:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Request Failed:', error);
  //   }
  // };


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
