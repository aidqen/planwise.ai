import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, Edit, Plus } from 'lucide-react'

export function MobileDropdownMenu({ onCreateTask, onEdit, handleSaveSchedule }) {
    return (
        <div className="flex md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 dark:text-gray-300">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <DropdownMenuItem className="text-gray-700 dark:text-gray-200 dark:focus:bg-gray-700/50 dark:focus:text-gray-100" onClick={onEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Schedule</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-700 dark:text-gray-200 dark:focus:bg-gray-700/50 dark:focus:text-gray-100" onClick={onCreateTask}>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add New Task</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}