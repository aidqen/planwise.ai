import { hexToRgba } from "@/services/util.service";
import { Brain, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

export function HomepageActions() {
     
    const actions = [
        {
          logo: Brain,
          color: '#3D84F6',
          title: 'Smart Scheduling',
          description: 'Let AI optimize your daily schedule based on your goals and preferences.',
          href: '/schedule/new'
        },
        {
          logo: Calendar,
          color: '#68D391',
          title: 'Adaptive Routines',
          description: 'Automatically adjust your schedule as your goals and priorities change.',
          href: 'hi'
        },
        {
            logo: Sparkles,
            color: '#F6AD55',
            title: 'AI Suggestions',
            description: 'Get personalized recommendations to optimize your daily routine.',
            href: 'hi'
          },
        {
          logo: Clock,
          color: '#B794F4',
          title: 'Time Blocking',
          description: 'Efficiently organize your day with AI-suggested time blocks.',
          href: 'hi'
        },
        
      ];
    return (
        <div className="grid grid-rows-4 xl:grid-cols-2 xl:grid-rows-2 grid-cols-1 gap-5 w-full">
            {actions.map((action, idx) => <Link key={idx} href={action?.href} className="flex flex-col items-start gap-1 w-full  bg-white rounded-[10px] shadow-md hover:shadow-lg transition-shadow p-5" 
            // style={{backgroundColor: hexToRgba(action.color, 0.1)}}
            >
                <div className="p-2 rounded-lg" 
                style={{backgroundColor: hexToRgba(action.color, 0.1)}}
                >

                <action.logo size={24} style={{color: action.color}}/>
                </div>
                <h4 className="text-black text-base">{action?.title}</h4>
                <p className="text-[#B6BBC3] text-sm">{action.description}</p>
            </Link>)}
        </div>
    )
}