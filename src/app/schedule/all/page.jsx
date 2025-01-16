'use client'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { SchedulePreview } from './components/SchedulePreview';
import { ScheduleFilter } from './components/ScheduleFilter';

export default function AllSchedules() {
    const user = useSelector(state => state.userModule.user);
    const [selectedTab, setSelectedTab] = useState('all'); // Use state to track the selected tab
    const tabs = [
        { id: "all", label: "All" },
        { id: "this-week", label: "This Week" },
        { id: "this-month", label: "This Month" },
        { id: "archived", label: "Archived" },
    ];
    // const mockSchedules = [
    //     {
    //         id: "1",
    //         date: "2024-04-28",
    //         updatedAt: "2024-04-28T10:00:00Z",
    //         wakeupTime: "07:00",
    //         sleepTime: "22:00",
    //         intensity: "moderate",
    //         goals: ["Complete project presentation", "Gym workout", "Read 30 pages", "Meditate", "Practice piano"],
    //     },
    //     {
    //         id: "2",
    //         date: "2024-04-29",
    //         updatedAt: "2024-04-29T08:30:00Z",
    //         wakeupTime: "06:30",
    //         sleepTime: "21:30",
    //         intensity: "intense",
    //         goals: ["Client meeting", "Finish report", "Team lunch"],
    //     },
    // ];




    return (
        <div className="px-4 py-8 w-full min-h-screen  md:pt-[4.1rem] sm:px-6 lg:px-8">
            {/* <div className="mx-auto max-w-7xl"> */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-white max-sm:text-2xl">Your Schedules</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        View and manage your daily schedules
                    </p>
                </div>

                {/* Tabs */}


                {/* Navigation UI */}
                <ScheduleFilter tabs={tabs} setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
                {/* Schedules Grid */}
                <div className="space-y-3 md:space-y-6">
                    {/* <div>
                        <h2 className="mb-3 text-sm font-medium text-gray-600">Favorite Schedules</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {user?.schedules?.filter(schedule => schedule.isStarred)?.map((schedule) => (
                                <SchedulePreview key={schedule.id} schedule={schedule} />
                            ))}
                        </div>
                    </div> */}
                    
                    <div>
                        <h2 className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">All Schedules</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {user?.schedules?.map((schedule) => (
                                <SchedulePreview key={schedule.id} schedule={schedule} />
                            ))}
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}