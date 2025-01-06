import { Button } from "@/components/ui/button"
import { Pen, Plus, Save, Edit, Star } from 'lucide-react'

export function DesktopActions({ onCreateTask, onEdit, handleSaveSchedule }) {
    return (
        <div className="hidden flex-row md:gap-1.5 lg:gap-2 xl:gap-3 justify-end w-max md:flex">
            <Button variant="ghost" onClick={onEdit} className='flex justify-center items-center p-1.5 w-9 h-9'>
                <Star className="w-6 h-6" />
            </Button>
            <Button onClick={onEdit} className='px-3 py-2 w-full text-sm font-medium text-white bg-gray-500 rounded-lg sm:w-auto hover:bg-gray-600'>
                <Edit className="mr-1 w-4 h-4" />
                Edit
            </Button>
            <Button onClick={onCreateTask} className='px-3 py-2 w-full text-sm font-medium text-white bg-blue-500 rounded-lg sm:w-auto'>
                <Plus className="mr-1 w-4 h-4" />
                Add New Task
            </Button>
            <Button onClick={handleSaveSchedule} variant="outline" className="w-full hover:bg-white/70 sm:w-auto">
                <Save className="mr-2 w-4 h-4" />
                Save
            </Button>
        </div>
    )
}