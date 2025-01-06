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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from "@/components/hooks/use-toast";
import { updateScheduleInUser } from '@/store/actions/user.actions';
import { useDispatch } from 'react-redux';

export function EditScheduleModal({ schedule, setSchedule, onSaveEditSchedule, open, onOpenChange }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
        const hour = Math.floor(i / 4)
        const minute = (i % 4) * 15
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
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

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/schedule/delete/${schedule.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete schedule');
            }

            // Update user state to remove the deleted schedule
            dispatch(updateScheduleInUser(null, schedule.id));
            
            toast({
                title: "Success",
                description: "Schedule deleted successfully",
            });
            router.push('/schedule/all');
        } catch (error) {
            console.error('Failed to delete schedule:', error);
            toast({
                title: "Error",
                description: "Failed to delete schedule",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            onOpenChange(false);
        }
    };

    // Get night time options (7 PM to 3 AM)
    const nightTimeOptions = [
        ...timeOptions.slice(76, 96), // 19:00 to 23:45
        ...timeOptions.slice(0, 13)   // 00:00 to 03:15
    ]

    // Get morning time options (4 AM to 1 PM)
    const morningTimeOptions = timeOptions.slice(16, 53) // 04:00 to 13:00

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Schedule</DialogTitle>
                    <DialogDescription>
                        Make changes to your schedule here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={schedule?.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="col-span-3"
                                placeholder="Enter schedule name"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <Label htmlFor="wakeup" className="text-right">
                                Wake Up
                            </Label>
                            <Select
                                value={schedule?.preferences?.wakeup || '06:00'}
                                onValueChange={(value) => handleInputChange('wakeup', value)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {morningTimeOptions.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 gap-4 items-center">
                            <Label htmlFor="sleep" className="text-right">
                                Sleep
                            </Label>
                            <Select
                                value={schedule?.preferences?.sleep || '22:00'}
                                onValueChange={(value) => handleInputChange('sleep', value)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {nightTimeOptions.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-600 sm:w-auto"
                            disabled={loading}
                        >
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            className="w-full text-white sm:w-auto"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}