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
            className='px-3 py-2 w-full text-sm font-medium text-black rounded-xl shadow-md sm:w-auto hover:bg-gray-100'
            >
                {/* <Edit className="mr-1 w-4 h-4" />
                Edit */}
                <Pen className="mr-1 w-4 h-4" />
                
            </Button>
            <Button onClick={onCreateTask} className='px-3 py-2 w-full text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 sm:w-auto'>
                <Plus className="mr-1 w-4 h-4" />
                Add New Task
            </Button>
            <Button onClick={handleSaveSchedule} variant="outline" className="w-full text-black shadow-md hover:bg-green-500 sm:w-auto">
                <Save className="mr-2 w-4 h-4" />
                Save
            </Button>
        </div>
    )
}