'use client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { 
    AlertCircle, 
    Target, 
    Clock, 
    Settings, 
    ChevronRight 
} from 'lucide-react'

export function ConfigurationCTA({ user }) {
    const router = useRouter()

    // Determine configuration status
    const missingConfigurations = [
        ...(!(user?.goals?.length > 0) ? ['goals'] : []),
        ...(!(user?.routines?.length > 0) ? ['routines'] : []),
        ...(Object.keys(user?.preferences || {}).length === 0 ? ['preferences'] : [])
    ]

    // No missing configurations
    if (missingConfigurations.length === 0) return null

    // Render configuration message and CTA
    return (
        <div className="flex flex-col justify-between items-start p-6 mb-6 space-y-4 w-full bg-gray-50 rounded-xl border border-gray-300 border-dashed dark:bg-gray-900/50 dark:border-gray-700 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex items-start space-x-4">
                <AlertCircle className="flex-shrink-0 mt-1 w-8 h-8 text-yellow-500 dark:text-yellow-400" />
                <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        Complete Your Setup
                    </h3>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {missingConfigurations.length === 3 
                            ? "You haven't done your setup yet. Let's get started!" 
                            : `You're almost there! Complete your ${missingConfigurations.join(', ')} setup.`}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {missingConfigurations.map((config) => (
                            <span 
                                key={config} 
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                            >
                                {config === 'goals' && <Target className="mr-1 w-3 h-3" />}
                                {config === 'routines' && <Clock className="mr-1 w-3 h-3" />}
                                {config === 'preferences' && <Settings className="mr-1 w-3 h-3" />}
                                {config}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <Button 
                onClick={() => router.push('/preferences')}
                className="flex justify-center items-center mt-4 w-full text-white bg-blue-500 md:mt-0 md:w-auto hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                Configure Now
                <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    )
}
