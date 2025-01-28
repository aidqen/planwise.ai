import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Pen, X, Check } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EditablePreference({
    value,
    type = 'time',
    options = ['relaxed', 'moderate', 'intense'],
    handlePreferenceEdit,
    keyName,
    preferences
}) {
    const [isHover, setIsHover] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(value)
    const isMobile = useIsMobile()

    function toggleEdit(e) {
        e.stopPropagation()
        setIsEditing(prevState => !prevState)
        // Reset edit value when toggling
        setEditValue(value)
    }
    
    function handleSave(e) {
        e.stopPropagation()
        // Here you would typically call a function to update the preference
        // For now, we'll just toggle editing
        if (editValue !== preferences[keyName]) {
            handlePreferenceEdit(keyName, editValue)
        }
        setIsEditing(false)
    }

    const renderEditInterface = () => {
        switch (type) {
            case 'time':
                return (
                    <div className="flex items-center space-x-2 w-full">
                        <div
                            className="flex flex-grow justify-end items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <X
                                className={cn("flex-shrink-0 mr-2 w-5 h-5 text-gray-900 transition-opacity dark:text-gray-300")}
                                onClick={toggleEdit}
                            />
                            <Input
                                type="time"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="bg-transparent w-full max-w-[120px]"
                                name={keyName}
                            />
                            <Check
                                className={cn("flex-shrink-0 ml-2 w-5 h-5 text-green-600 transition-opacity dark:text-green-400")}
                                onClick={handleSave}
                            />
                        </div>
                    </div>
                )
            case 'intensity':
                return (
                    <div className="flex items-center space-x-2 w-full">
                        <X
                            className={cn("flex-shrink-0 w-5 h-5 text-gray-900 transition-opacity dark:text-gray-300")}
                            onClick={toggleEdit}
                        />
                        <div
                            className="flex flex-grow items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Select
                                value={editValue}
                                onValueChange={(newValue) => setEditValue(newValue)}
                            >
                                <SelectTrigger
                                    className="w-full max-w-[180px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                >
                                    <SelectValue>
                                        {editValue ?
                                            <span className="capitalize">{editValue}</span> :
                                            <span className="text-gray-500">Select intensity</span>
                                        }
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600">
                                    {options.map((option) => (
                                        <SelectItem
                                            key={option}
                                            value={option.toLowerCase()}
                                            className="text-gray-900 capitalize dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Check
                                className={cn("flex-shrink-0 ml-2 w-5 h-5 text-green-600 transition-opacity dark:text-green-400")}
                                onClick={handleSave}
                            />
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div
            className={cn(
                "flex flex-row justify-end items-center cursor-pointer",
                "w-full max-w-[250px]",  // Ensure consistent width
                isMobile ? "text-sm" : "text-base"  // Adjust text size for mobile
            )}
            onClick={toggleEdit}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {isEditing ? (
                renderEditInterface()
            ) : (
                <div className="flex justify-end items-center w-full">
                    <Pen
                        className={cn(
                            (!isMobile && !isHover) ? 'opacity-0' : "opacity-100",
                            "transition-opacity mr-2 w-3.5 h-3.5 dark:text-gray-300 text-gray-900 flex-shrink-0"
                        )}
                    />
                    <span className={cn(
                        "font-medium text-gray-900 dark:text-gray-100",
                        isMobile ? "text-sm" : "text-base",
                        "text-right capitalize truncate"
                    )}>
                        {value}
                    </span>
                </div>
            )}
        </div>
    )
}