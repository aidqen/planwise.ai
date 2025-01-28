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
                        className="text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                        Save Changes
                    </Button>
                )}
            />
            
            <div className="grid grid-cols-2 gap-3 mb-5 sm:gap-4 sm:mb-6">
                <div className="p-3 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">Wake Up</p>
                        <TimePicker
                            value={localPreferences?.wakeup}
                            onChange={handleTimeChange('wakeup')}
                            startHour={4}
                            endHour={12}
                            className="text-sm font-medium text-gray-600 dark:text-gray-400"
                        />
                    </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">Sleep</p>
                        <TimePicker
                            value={localPreferences?.sleep}
                            onChange={handleTimeChange('sleep')}
                            startHour={20}
                            endHour={2}
                            className="text-sm font-medium text-gray-600 dark:text-gray-400"
                        />
                    </div>
                </div>
                <div className="col-span-2 p-3 bg-gray-50 rounded-xl transition-colors duration-200 dark:bg-gray-800/80">
                    <div className="flex gap-4 justify-between items-center">
                        <p className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">Intensity</p>
                        <Select 
                            value={localPreferences?.intensity} 
                            onValueChange={handleIntensityChange}
                        >
                            <SelectTrigger className="p-0 h-auto text-sm font-medium text-gray-600 bg-transparent border-none shadow-none dark:text-gray-400 hover:opacity-70">
                                <SelectValue className="capitalize" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <SelectGroup className="p-1">
                                    <SelectItem value="low" className="p-2 text-sm font-medium text-gray-600 capitalize rounded-md dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">Low</SelectItem>
                                    <SelectItem value="medium" className="p-2 text-sm font-medium text-gray-600 capitalize rounded-md dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">Medium</SelectItem>
                                    <SelectItem value="high" className="p-2 text-sm font-medium text-gray-600 capitalize rounded-md dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">High</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </PreferenceCard>
    )
}
