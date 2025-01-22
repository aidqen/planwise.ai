import { Button } from "@/components/ui/button"
import { Pen, Plus, Save, Edit, Star } from 'lucide-react'

export function DesktopActions({ onCreateTask, handleSaveSchedule, setIsEditModalOpen }) {

    function onEdit() {
        setIsEditModalOpen(true)
    }
    return (
        <div className="hidden flex-row md:gap-1.5 lg:gap-2 xl:gap-3 justify-end w-max md:flex">
            
            <Button onClick={onEdit} 
            variant="outline"
            className="px-3 py-2 w-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-md sm:w-auto hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            >
                <Pen className="mr-1 w-4 h-4" />
                Edit
            </Button>

            <Button 
                onClick={onCreateTask} 
                className="px-3 py-2 w-full text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 sm:w-auto"
            >
                <Plus className="mr-1 w-4 h-4" />
                Add New Task
            </Button>

            {/* <Button 
                onClick={handleSaveSchedule} 
                variant="outline" 
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md hover:bg-green-500 hover:text-white dark:hover:bg-green-600 sm:w-auto border border-gray-200 dark:border-gray-600"
            >
                <Save className="mr-2 w-4 h-4" />
                Save
            </Button> */}
        </div>
    )
}