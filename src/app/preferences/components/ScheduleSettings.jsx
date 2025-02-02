'use client'
import { useState, useEffect } from 'react'
import { Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PreferenceCard, CardHeader, IconWrapper } from './PreferenceCard'
import TimePicker from '@/components/TimePicker'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ScheduleSettings({preferences, handleUserUpdate}) {
    // Initialize local state with existing preferences or default values
    const [localPreferences, setLocalPreferences] = useState({
        wakeup: preferences?.wakeup || '07:00',
        sleep: preferences?.sleep || '22:00',
        intensity: preferences?.intensity || 'moderate'
    })
    
    // Track if changes have been made
    const [hasChanges, setHasChanges] = useState(false)

    // Compare local preferences with original preferences
    useEffect(() => {
      setLocalPreferences(preferences)
    }, [preferences])
    
    useEffect(() => {
        const hasLocalChanges = 
            localPreferences?.wakeup !== (preferences?.wakeup) ||
            localPreferences?.sleep !== (preferences?.sleep ) ||
            localPreferences?.intensity !== (preferences?.intensity )
        
        setHasChanges(hasLocalChanges)
    }, [localPreferences, preferences])

    const handleTimeChange = (type) => (value) => {
        setLocalPreferences(prev => ({ ...prev, [type]: value }))
    }

    const handleIntensityChange = (value) => {
        setLocalPreferences(prev => ({ ...prev, intensity: value }))
    }

    const handleSavePreferences = () => {
        handleUserUpdate('preferences', localPreferences)
        setHasChanges(false)
    }

    const intensityOptions = [
        {
            value: 'relaxed',
            label: 'Relaxed',
            description: 'More Breaks, Spread Out Tasks',
        },
        {
            value: 'moderate',
            label: 'Moderate',
            description: 'Balanced Breaks And Tasks',
        },
        {
            value: 'intense',
            label: 'Intense',
            description: 'Busy Schedule, Minimal Breaks',
        }
    ];

    return (
        <PreferenceCard>
            <CardHeader
                icon={<IconWrapper color="blue"><Settings className="w-4 h-4 sm:w-5 sm:h-5" /></IconWrapper>}
                title="Schedule Preferences"
                action={hasChanges && (
                    <Button 
                        onClick={handleSavePreferences}
                        className="text-xs rounded-md sm:text-sm text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 px-2 sm:px-4 py-1.5 sm:py-2"
                    >
                        Save Changes
                    </Button>
                )}
            />
            
            <div className="grid grid-cols-1 gap-2 mb-4 sm:grid-cols-2 sm:gap-3 md:gap-4 sm:mb-5 md:mb-6">
                <div className="p-2.5 sm:p-3 md:p-4 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">Wake Up</p>
                        <TimePicker
                            value={localPreferences?.wakeup}
                            onChange={handleTimeChange('wakeup')}
                            startHour={4}
                            endHour={12}
                            className="text-xs font-medium text-gray-600 sm:text-sm dark:text-gray-400"
                        />
                    </div>
                </div>
                <div className="p-2.5 sm:p-3 md:p-4 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">Sleep</p>
                        <TimePicker
                            value={localPreferences?.sleep}
                            onChange={handleTimeChange('sleep')}
                            startHour={20}
                            endHour={2}
                            className="text-xs font-medium text-gray-600 sm:text-sm dark:text-gray-400"
                        />
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 p-2.5 sm:p-3 md:p-4 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex flex-col gap-2 justify-between items-start sm:gap-4">
                        <p className="text-sm font-semibold text-gray-900 sm:text-base md:text-base dark:text-white">How busy do you want your schedule</p>
                        <Select 
                            value={localPreferences?.intensity} 
                            onValueChange={handleIntensityChange}
                        >
                            <SelectTrigger className="inline-flex justify-start items-center px-2 py-2 w-full text-xs text-gray-700 bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 sm:px-3 md:px-5 sm:text-sm dark:bg-gray-800 dark:border-gray-700 me-2 dark:text-gray-200 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-500/20">
                                <SelectValue placeholder="Select intensity">
                                    <span className="text-gray-600 capitalize dark:text-gray-400">
                                        {localPreferences?.intensity}
                                    </span>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <SelectGroup className="p-2">
                                    {intensityOptions.map((option) => (
                                        <SelectItem 
                                            key={option.value} 
                                            value={option.value} 
                                            className="relative p-3 ps-8 text-xs sm:text-sm font-medium rounded-md data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700/50 transition-colors duration-150 [&>*]:m-0 [&>*]:p-0"
                                        >
                                            <div className="flex items-center w-full">
                                                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                                                    <span className="text-gray-900 dark:text-gray-100">
                                                        {option.label}
                                                    </span>
                                                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                                                        {option.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </PreferenceCard>
    )
}
