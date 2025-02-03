'use client'

import { SortDropdown } from './SortDropdown';
import { ScheduleGrid } from './ScheduleGrid';

export function ScheduleSection({ selectedTab, tabs, schedules, sortConfig, onSortChange }) {
    return (
        <div>
            <div className="flex justify-between items-center my-4">
                {/* <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {tabs.find(tab => tab.id === selectedTab)?.label} Schedules
                </h2> */}
                <SortDropdown 
                    sortConfig={sortConfig} 
                    onSortChange={onSortChange}
                />
            </div>
            
            <div className="space-y-3 md:space-y-6">
                <ScheduleGrid 
                    schedules={schedules}
                    selectedTab={selectedTab}
                    tabs={tabs}
                />
            </div>
        </div>
    );
}
