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
                    <Button variant="ghost" className="p-0 w-8 h-8">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={onEdit} className="gap-2 cursor-pointer">
                        <Edit className="mr-2 w-4 h-4" />
                        <span>Edit Schedule</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onCreateTask} className="gap-2 cursor-pointer">
                        <Plus className="mr-2 w-4 h-4" />
                        <span>Add New Task</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}