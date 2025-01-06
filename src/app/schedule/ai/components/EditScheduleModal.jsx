"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from 'date-fns'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function EditScheduleModal({ schedule, setSchedule, onSaveEditSchedule, open, onOpenChange }) {
    const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
        const hour = Math.floor(i / 4)
        const minute = (i % 4) * 15
        return format(new Date().setHours(hour, minute), 'HH:mm')
    })

    const handleInputChange = (field, value) => {
        setSchedule(prev => ({
            ...prev,
            ...(field === 'name' ? { name: value } : {
                preferences: {
                    ...prev.preferences,
                    [field]: value
                }
            })
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSaveEditSchedule(schedule)
        onOpenChange(false)
    }

    // Get night time options (7 PM to 3 AM)
    const nightTimeOptions = [
        ...timeOptions.slice(76, 96), // 19:00 to 23:45
        ...timeOptions.slice(0, 13)   // 00:00 to 03:15
    ]

    // Get morning time options (4 AM to 1 PM)
    const morningTimeOptions = timeOptions.slice(16, 53) // 04:00 to 13:00

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[10px] w-[95%] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Edit Schedule</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Customize your schedule settings
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Schedule Name
                        </Label>
                        <Input
                            id="name"
                            value={schedule?.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full"
                            placeholder="Enter schedule name"
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="wakeup" className="text-sm font-medium">
                                Wake Up Time
                            </Label>
                            <Select
                                value={schedule?.preferences?.wakeup || '06:00'}
                                onValueChange={(value) => handleInputChange('wakeup', value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Morning</SelectLabel>
                                        {morningTimeOptions.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {format(new Date(`2000-01-01T${time}`), 'h:mm a')}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sleep" className="text-sm font-medium">
                                Sleep Time
                            </Label>
                            <Select
                                value={schedule?.preferences?.sleep || '22:00'}
                                onValueChange={(value) => handleInputChange('sleep', value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Night</SelectLabel>
                                        {nightTimeOptions.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {format(new Date(`2000-01-01T${time}`), 'h:mm a')}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="gap-3 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-600 sm:w-auto"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}