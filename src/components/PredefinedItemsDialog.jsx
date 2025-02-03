'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Info, Plus, Check } from 'lucide-react'
import { getImportanceColor } from '@/services/util.service'
import { cn } from '@/lib/utils'

export function PredefinedItemsDialog({
    items,
    type,
    onSelect,
    triggerClassName,
    triggerChildren
}) {
    const [selectedItems, setSelectedItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const handleItemToggle = (item) => {
        console.log("🚀 ~ file: PredefinedItemsDialog.jsx:21 ~ item:", item)
        setSelectedItems(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        )
    }

    const handleSave = () => {
        if (selectedItems.length > 0) {
            onSelect(selectedItems)
            setSelectedItems([])
            setIsOpen(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={`flex gap-2 items-center px-3 py-2 text-gray-700 bg-blue-500 rounded-md border border-gray-200 shadow-sm transition-all duration-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:shadow-md ${triggerClassName}`}
                >
                    {triggerChildren || (
                        <>
                            <Plus className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            <span className="text-sm font-medium">
                                Add from previous {type}
                            </span>
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-s-lg w-[95vw] max-w-[500px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">
                        Select Predefined {type}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Choose {type} from your existing list to add to this schedule
                    </DialogDescription>
                </DialogHeader>

                {items?.length ? (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center p-3 space-x-3 bg-gray-50 rounded-lg transition-colors dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Checkbox
                                    checked={selectedItems.includes(item)}
                                    onCheckedChange={() => handleItemToggle(item)}
                                    id={`item-${index}`}
                                    className="border-gray-300 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`item-${index}`}
                                    className="flex flex-row flex-1 justify-between items-center text-sm font-medium text-gray-900 cursor-pointer dark:text-white"
                                >
                                    <span className=''>
                                        {item.name}
                                    </span>
                                    {item.importance && (
                                        <span className={cn(
                                            "flex justify-center items-center px-2 py-0.5  rounded-full text-xs font-medium ml-2 w-[4em] flex-shrink-0 text-center",
                                            getImportanceColor(item.importance)
                                        )}>
                                            {item.importance}
                                        </span>
                                    )}
                                    {item.startTime && (
                                        <span className="ml-2 text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                                            {item.startTime} - {item.endTime}
                                        </span>
                                    )}
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 rounded-lg dark:bg-gray-800">
                        <Info className="mb-2 w-8 h-8 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            No predefined {type} available. Create some in your preferences first.
                        </p>
                    </div>
                )}

                <DialogFooter className="grid grid-cols-2 gap-2 justify-between items-center mt-4">
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            className="md:mr-2 dark:text-white"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSave}
                        disabled={selectedItems.length === 0}
                        className="flex gap-2 items-center text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                        <Check className="w-4 h-4" />
                        Add {selectedItems.length > 0 ? `${selectedItems.length} ${type}` : type}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
