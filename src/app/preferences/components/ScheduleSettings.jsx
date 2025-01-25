import { Settings2 } from 'lucide-react'
import { PreferenceCard, CardHeader, IconWrapper } from './PreferenceCard'
import TimePicker from '@/components/TimePicker'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ScheduleSettings({ preferences, onUpdate }) {
    const handleTimeChange = (type) => (value) => {
        onUpdate({ ...preferences, [type]: value })
    }

    const handleIntensityChange = (value) => {
        onUpdate({ ...preferences, intensity: value })
    }

    return (
        <PreferenceCard>
            <CardHeader
                icon={<IconWrapper color="blue"><Settings2 className="w-4 h-4 sm:w-5 sm:h-5" /></IconWrapper>}
                title="Schedule Settings"
            />
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-xl transition-colors duration-200">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Wake Up</p>
                        <TimePicker
                            value={preferences.wakeup}
                            onChange={handleTimeChange('wakeup')}
                            startHour={4}
                            endHour={12}
                            className="text-sm font-medium text-gray-600 dark:text-gray-400"
                        />
                    </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-xl transition-colors duration-200">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Sleep</p>
                        <TimePicker
                            value={preferences.sleep}
                            onChange={handleTimeChange('sleep')}
                            startHour={20}
                            endHour={2}
                            className="text-sm font-medium text-gray-600 dark:text-gray-400"
                        />
                    </div>
                </div>
                <div className="p-3 col-span-2 bg-gray-50 dark:bg-gray-800/80 rounded-xl transition-colors duration-200">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Intensity</p>
                        <Select value={preferences.intensity} onValueChange={handleIntensityChange}>
                            <SelectTrigger className="bg-transparent border-none shadow-none p-0 h-auto text-sm font-medium text-gray-600 dark:text-gray-400 hover:opacity-70">
                                <SelectValue className="capitalize" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <SelectGroup className="p-1">
                                    <SelectItem value="low" className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md p-2">Low</SelectItem>
                                    <SelectItem value="medium" className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md p-2">Medium</SelectItem>
                                    <SelectItem value="high" className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md p-2">High</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </PreferenceCard>
    )
}
