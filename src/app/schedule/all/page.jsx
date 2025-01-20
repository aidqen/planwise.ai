'use client'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { SchedulePreview } from './components/SchedulePreview';
import { ScheduleFilter } from './components/ScheduleFilter';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AllSchedules() {
    const user = useSelector(state => state.userModule.user);
    const [selectedTab, setSelectedTab] = useState('all'); // Use state to track the selected tab
    const tabs = [
        { id: "all", label: "All" },
        { id: "this-week", label: "This Week" },
        { id: "this-month", label: "This Month" },
        { id: "archived", label: "Archived" },
    ];
    // const user = {
    //     _id: '67583fa1d7a022f6b2ccf5a2',
    //     email: 'idanmarkin8@gmail.com',
    //     name: 'idan markin',
    //     createdAt: '2024 - 12 - 10T13: 18: 24.556Z',
    //     updatedAt: '2025-01 - 15T13: 35: 34.747Z',
    //     image: 'https://lh3.googleusercontent.com/a/ACg8ocKF-GG3hyHVcFbzOBHDr8vL_1cWsEor5X7fhC3UZ-B2ZWNIrg=s96-c',
    //     schedules: [
    //     ]
    // }
    const router = useRouter();

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
            <ScheduleFilter tabs={tabs} setSelectedTab={setSelectedTab} selectedTab={selectedTab} schedulesLength={user?.schedules?.length}/>
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

                {user?.schedules?.length ? <div>
                    <h2 className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">All Schedules</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {user?.schedules?.map((schedule) => (
                            <SchedulePreview key={schedule.id} schedule={schedule} />
                        ))}
                    </div>
                </div> : 
                <div className="flex flex-col gap-4 justify-center items-start mt-8 w-full max-sm:mt-4">
                    <p className="text-lg text-gray-600 max-sm:text-base dark:text-gray-300">You have no schedules yet</p>
                    <button
                        onClick={() => router.push('/schedule/new')}
                        className="flex gap-2 items-center px-4 py-2 max-sm:px-3 max-sm:py-1.5 font-medium text-white bg-blue-500 rounded-lg shadow-md transition-colors dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        <span className="max-sm:text-sm">New Schedule</span>
                        <Plus className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5" />
                    </button>
                </div>}     
            </div>
            {/* </div> */}
        </div>
    );
}