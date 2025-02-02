'use client'
import { PreferencesHeader } from './components/PreferencesHeader'
import { ScheduleSettings } from './components/ScheduleSettings'
import { GoalsSection } from './components/GoalsSection'
import { RoutinesSection } from './components/RoutinesSection'
import { useSelector } from 'react-redux'
import { updateUser } from '@/store/actions/user.actions'
import { useToast } from "@/components/hooks/use-toast"
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'

export default function PlanwiseDashboard() {
    const user = useSelector(state => state.userModule.user)
    const { toast } = useToast()

    const handleUserUpdate = async (key, newValue) => {
        try {
            const updatedUser = {
                ...user,
                [key]: newValue
            }
            await updateUser(updatedUser)
        } catch (error) {
            console.error(`Error updating user ${key}:`, error)
            toast({
                title: 'Update Failed',
                description: `Could not update ${key}`,
                variant: 'destructive'
            })
        }
    }

    const handleRemoveItem = async (key, itemId) => {
        try {
            // Get the current list of items
            const currentItems = user[key] || []

            // Filter out the item with the matching ID
            const updatedItems = currentItems.filter(item =>
                // Check if item has an ID property, or use index comparison
                item.id !== itemId && item !== itemId
            )

            // Update the user with the filtered list
            await handleUserUpdate(key, updatedItems)

            // Show a success toast
            toast({
                title: 'Item Removed',
                description: `Successfully removed the ${key.slice(0, -1)}`,
                variant: 'default'
            })
        } catch (error) {
            console.error(`Error removing ${key}:`, error)
            toast({
                title: 'Removal Failed',
                description: `Could not remove the ${key.slice(0, -1)}`,
                variant: 'destructive'
            })
        }
    }

    return (
        <div className="flex flex-col w-full min-h-screen md:h-full">
            <div className="overflow-y-auto flex-1 md:flex md:items-center max-sm:pt-16">
                <div className="w-full">
                    <PreferencesHeader />
                    <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12">
                        <div className="grid gap-6 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3">
                            <ScheduleSettings handleUserUpdate={handleUserUpdate} preferences={user?.preferences} />
                            <GoalsSection
                                handleUserUpdate={handleUserUpdate}
                                handleRemoveItem={handleRemoveItem}
                                goals={user?.goals}
                            />
                            <RoutinesSection
                                handleUserUpdate={handleUserUpdate}
                                handleRemoveItem={handleRemoveItem}
                                routines={user?.routines}
                            />
                            <div className="flex justify-start max-w-7xl">

                                <div className="flex justify-between items-center mt-3 space-x-4 w-max">
                                    <Link
                                        href="/home"
                                        className="flex flex-row flex-1 justify-center items-center px-3 py-3 text-xs font-medium text-center text-gray-700 whitespace-nowrap bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-200 sm:text-sm hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                                    >
                                        <ArrowLeft className="mr-1 w-4 h-4" />
                                        Back to Dashboard
                                    </Link>
                                    <Link
                                        href="/schedule/new"
                                        className="flex flex-row flex-1 justify-center items-center px-3 py-3 text-xs font-medium text-center text-white whitespace-nowrap bg-green-500 rounded-lg shadow-sm transition-colors duration-200 sm:text-sm hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 hover:shadow-md"
                                    >
                                        <Plus className="mr-1 w-4 h-4" />
                                        Create New Schedule
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
