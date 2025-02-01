'use client'
import { useSelector } from 'react-redux';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';
import { useState, useMemo } from 'react';
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
    const router = useRouter();

    const filteredSchedules = useMemo(() => {
        if (!user?.schedules) return [];

        const now = new Date();
        switch (selectedTab) {
            case 'all':
                return user.schedules;
            case 'this-week':
                const weekStart = startOfWeek(now);
                const weekEnd = endOfWeek(now);
                return user.schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.updatedAt);
                    return scheduleDate >= weekStart && scheduleDate <= weekEnd;
                });
            case 'this-month':
                const monthStart = startOfMonth(now);
                const monthEnd = endOfMonth(now);
                return user.schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.updatedAt);
                    return scheduleDate >= monthStart && scheduleDate <= monthEnd;
                });
            case 'archived':
                return user.schedules.filter(schedule => schedule.isArchived);
            default:
                return user.schedules;
        }
    }, [user?.schedules, selectedTab]);

    return (
        <div className="px-4 py-12 w-full min-h-screen md:pt-[4.1rem] sm:px-6 lg:px-8 overflow-y-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white max-sm:text-2xl">Your Schedules</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    View and manage your schedules
                </p>
            </div>

            <ScheduleFilter 
                tabs={tabs} 
                setSelectedTab={setSelectedTab} 
                selectedTab={selectedTab} 
                schedulesLength={filteredSchedules.length}
            />

            <div className="space-y-3 md:space-y-6">
                {filteredSchedules.length ? (
                    <div>
                        <h2 className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                            {tabs.find(tab => tab.id === selectedTab)?.label} Schedules
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {filteredSchedules.map((schedule) => (
                                <SchedulePreview key={schedule.id} schedule={schedule} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 justify-center items-start mt-8 w-full max-sm:mt-4">
                        <p className="text-lg text-gray-600 max-sm:text-base dark:text-gray-300">
                            No schedules found in {tabs.find(tab => tab.id === selectedTab)?.label} category
                        </p>
                        <button
                            onClick={() => router.push('/schedule/new')}
                            className="flex gap-2 items-center px-4 py-2 max-sm:px-3 max-sm:py-1.5 font-medium text-white bg-blue-500 rounded-lg shadow-md transition-colors dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            <span className="max-sm:text-sm">New Schedule</span>
                            <Plus className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5" />
                        </button>
                    </div>
                )}     
            </div>
        </div>
    );
}