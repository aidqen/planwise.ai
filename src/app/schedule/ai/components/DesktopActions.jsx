import { Button } from "@/components/ui/button"
import { Pen, Plus, Save, Edit, Star } from 'lucide-react'

export function DesktopActions({ onCreateTask }) {

    return (
        <div className="hidden flex-row md:gap-1.5 lg:gap-2 xl:gap-3 justify-end w-max md:flex">
            <Button 
                onClick={onCreateTask} 
                className="px-3 py-2 w-full text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 sm:w-auto"
            >
                <Plus className="mr-1 w-4 h-4" />
                Add New Task
            </Button>

            {/* <Button 
                onClick={handleSaveSchedule} 
                variant="outline" 
                className="w-full text-gray-900 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:text-white hover:bg-green-500 hover:text-white dark:hover:bg-green-600 sm:w-auto dark:border-gray-600"
            >
                <Save className="mr-2 w-4 h-4" />
                Save
            </Button> */}
        </div>
    )
}