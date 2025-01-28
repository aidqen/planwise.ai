'use client'
import { PreferencesHeader } from './components/PreferencesHeader'
import { ScheduleSettings } from './components/ScheduleSettings'
import { GoalsSection } from './components/GoalsSection'
import { RoutinesSection } from './components/RoutinesSection'
import { useSelector } from 'react-redux'
import { updateUser } from '@/store/actions/user.actions'
import { useToast } from "@/components/hooks/use-toast"

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
            <div className="flex-1 md:flex md:items-center">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
