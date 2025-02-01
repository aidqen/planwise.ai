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

    return (
        <PreferenceCard>
            <CardHeader
                icon={<IconWrapper color="blue"><Settings className="w-4 h-4 sm:w-5 sm:h-5" /></IconWrapper>}
                title="Schedule Settings"
                action={hasChanges && (
                    <Button 
                        onClick={handleSavePreferences}
                        className="text-xs sm:text-sm text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 px-2 sm:px-4 py-1.5 sm:py-2"
                    >
                        Save Changes
                    </Button>
                )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
                <div className="p-2.5 sm:p-3 md:p-4 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">Wake Up</p>
                        <TimePicker
                            value={localPreferences?.wakeup}
                            onChange={handleTimeChange('wakeup')}
                            startHour={4}
                            endHour={12}
                            className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400"
                        />
                    </div>
                </div>
                <div className="p-2.5 sm:p-3 md:p-4 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">Sleep</p>
                        <TimePicker
                            value={localPreferences?.sleep}
                            onChange={handleTimeChange('sleep')}
                            startHour={20}
                            endHour={2}
                            className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400"
                        />
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 p-2.5 sm:p-3 md:p-4 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex gap-2 sm:gap-4 justify-between items-center">
                        <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">Intensity</p>
                        <Select 
                            value={localPreferences?.intensity} 
                            onValueChange={handleIntensityChange}
                        >
                            <SelectTrigger className="p-0 h-auto text-xs sm:text-sm font-medium text-gray-600 bg-transparent border-none shadow-none dark:text-gray-400 hover:opacity-70">
                                <SelectValue className="capitalize" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <SelectGroup className="p-0.5 sm:p-1">
                                    <SelectItem value="relaxed" className="p-1.5 sm:p-2 text-xs sm:text-sm font-medium text-gray-600 capitalize rounded-md dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">Relaxed</SelectItem>
                                    <SelectItem value="moderate" className="p-1.5 sm:p-2 text-xs sm:text-sm font-medium text-gray-600 capitalize rounded-md dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">Moderate</SelectItem>
                                    <SelectItem value="intense" className="p-1.5 sm:p-2 text-xs sm:text-sm font-medium text-gray-600 capitalize rounded-md dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">Intense</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </PreferenceCard>
    )
}
