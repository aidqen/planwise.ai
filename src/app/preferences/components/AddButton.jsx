import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function AddButton({ title, children, description='', compact = false }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="my-2 h-8 px-3 min-w-[80px] bg-gray-50/90 shadow-sm text-blue-500 hover:bg-gray-50 text-xs font-medium dark:text-white rounded-[10px] border-none hover:shadow transition-all duration-200 dark:bg-blue-600/90 dark:hover:bg-blue-700 py-4 "
                >
                    <Plus className="mr-1 w-3 h-3" />
                    <span>{title}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-gray-200 shadow-lg sm:max-w-md dark:bg-gray-900 dark:border-gray-800 dark:shadow-gray-900/20">
                <DialogHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
                    <DialogTitle className="font-semibold text-gray-900 dark:text-white">
                        {title}
                    </DialogTitle>
                    {description && <DialogDescription className="text-gray-400">{description}</DialogDescription>}
                </DialogHeader>
                <div className="px-1 pt-4">
                    <div className="relative bg-white rounded-lg dark:bg-gray-900">
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
