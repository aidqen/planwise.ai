'use client'

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SchedulePreview } from './SchedulePreview';

export function ScheduleGrid({ schedules, selectedTab, tabs }) {
    const router = useRouter();

    if (!schedules.length) {
        return (
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
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {schedules.map((schedule) => (
                <SchedulePreview key={schedule.id} schedule={schedule} />
            ))}
        </div>
    );
}
