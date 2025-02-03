'use client'

import { useSelector } from 'react-redux';
import { compareAsc, compareDesc, subDays } from 'date-fns';
import { useState, useMemo } from 'react';
import { ScheduleFilter } from './components/ScheduleFilter';
import { PageHeader } from './components/PageHeader';
import { ScheduleSection } from './components/ScheduleSection';

export default function AllSchedules() {
    const user = useSelector(state => state.userModule.user);
    const [selectedTab, setSelectedTab] = useState('all');
    const [sortConfig, setSortConfig] = useState({ field: 'date', direction: 'desc' });
    
    const tabs = [
        { id: "all", label: "All" },
        { id: "last-7-days", label: "Last 7 Days" },
        { id: "last-30-days", label: "Last 30 Days" },
        { id: "last-90-days", label: "Last 90 Days" },
    ];

    const filteredSchedules = useMemo(() => {
        if (!user?.schedules) return [];

        const now = new Date();
        let filteredList = user.schedules;

        // Filter by date range
        switch (selectedTab) {
            case 'last-7-days':
                filteredList = filteredList.filter(schedule => 
                    new Date(schedule.updatedAt) >= subDays(now, 7)
                );
                break;
            case 'last-30-days':
                filteredList = filteredList.filter(schedule => 
                    new Date(schedule.updatedAt) >= subDays(now, 30)
                );
                break;
            case 'last-90-days':
                filteredList = filteredList.filter(schedule => 
                    new Date(schedule.updatedAt) >= subDays(now, 90)
                );
                break;
            default:
                // 'all' - no additional filtering
        }

        // Sorting
        switch (sortConfig.field) {
            case 'date':
                filteredList.sort((a, b) => 
                    sortConfig.direction === 'desc' 
                        ? compareDesc(new Date(a.updatedAt), new Date(b.updatedAt))
                        : compareAsc(new Date(a.updatedAt), new Date(b.updatedAt))
                );
                break;
            case 'name':
                filteredList.sort((a, b) => {
                    const comparison = a.name.localeCompare(b.name);
                    return sortConfig.direction === 'desc' ? -comparison : comparison;
                });
                break;
            case 'intensity':
                const intensityOrder = { 'relaxed': 1, 'moderate': 2, 'intense': 3 };
                filteredList.sort((a, b) => {
                    const comparison = (intensityOrder[a.preferences?.intensity] || 0) - 
                        (intensityOrder[b.preferences?.intensity] || 0);
                    return sortConfig.direction === 'desc' ? -comparison : comparison;
                });
                break;
            case 'wakeup':
                filteredList.sort((a, b) => {
                    const comparison = (a.preferences?.wakeup || '00:00').localeCompare(
                        b.preferences?.wakeup || '00:00'
                    );
                    return sortConfig.direction === 'desc' ? -comparison : comparison;
                });
                break;
        }

        return filteredList;
    }, [user?.schedules, selectedTab, sortConfig]);

    return (
        <div className="px-4 py-12 w-full min-h-screen md:pt-[4.1rem] sm:px-6 lg:px-8 overflow-y-auto scrollbar">
            <PageHeader />
            
            <ScheduleFilter 
                tabs={tabs} 
                setSelectedTab={setSelectedTab} 
                selectedTab={selectedTab} 
                schedulesLength={filteredSchedules.length}
            />

            <ScheduleSection 
                selectedTab={selectedTab}
                tabs={tabs}
                schedules={filteredSchedules}
                sortConfig={sortConfig}
                onSortChange={setSortConfig}
            />
        </div>
    );
}