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
                    className="my-1.5 sm:my-2 h-7 sm:h-8 px-2 sm:px-3 min-w-[70px] sm:min-w-[80px] bg-gray-50/90 shadow-sm text-blue-500 hover:bg-gray-50 text-xs font-medium dark:text-white rounded-[10px] border-none hover:shadow transition-all duration-200 dark:bg-blue-600/90 dark:hover:bg-blue-700 py-3 sm:py-4"
                >
                    <Plus className="mr-1 w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{title}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:w-auto max-w-[95vw] sm:max-w-md bg-white border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800 dark:shadow-gray-900/20">
                <DialogHeader className="pb-3 sm:pb-4 border-b border-gray-100 dark:border-gray-800">
                    <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </DialogTitle>
                    {description && <DialogDescription className="text-xs sm:text-sm text-gray-400">{description}</DialogDescription>}
                </DialogHeader>
                <div className="px-0.5 sm:px-1 pt-3 sm:pt-4">
                    <div className="relative bg-white rounded-lg dark:bg-gray-900">
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
