'use client';

import { Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SLEEP, SET_WAKEUP } from '@/store/reducers/schedule.reducer';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function TimePicker({ timeType }) {
    // const [time, setTime] = useState(timeType === 'Wake Up' ? '7:00 AM' : '7:00 PM');
    const preferences = useSelector(state => state.scheduleModule.multiStepForm.preferences)
    const dispatch = useDispatch()
    const { wakeup, sleep } = preferences
    const time = timeType === 'Wake Up' ? wakeup : sleep
    console.log('time:', time)

    function handleTimeChange({target}) {
        const timeTypeKey = timeType === 'Wake Up' ? 'wakeup' : 'sleep';
        if (timeTypeKey === 'wakeup') dispatch({type: SET_WAKEUP, wakeup: target.value})
        else dispatch({type: SET_SLEEP, sleep: target.value})
    }

    function generateTimeSlots(startHour, endHour) {
      const slots = [];
      const totalHours = endHour < startHour ? 24 + endHour - startHour : endHour - startHour + 1;
  
      for (let i = 0; i < totalHours; i++) {
          const currentHour = (startHour + i) % 24;
  
          // Military time for ID
          const militaryTimeHour = String(currentHour).padStart(2, '0');
  
          // Convert to AM/PM for label
          const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
          const period = currentHour < 12 ? "AM" : "PM";
  
          // Add the ":00" time slot
          slots.push({
              id: `${militaryTimeHour}:00`,
              label: `${formattedHour}:00 ${period}`
          });
  
          // Add the ":30" time slot if not the last hour
          if (i < totalHours - 1) {
              slots.push({
                  id: `${militaryTimeHour}:30`,
                  label: `${formattedHour}:30 ${period}`
              });
          }
      }
  
      return slots;
  }

    const wakeupTimeSlots = generateTimeSlots(4, 13)
    console.log('wakeupTimeSlots:', wakeupTimeSlots)
    const sleepTimeSlots = generateTimeSlots(19, 4)
    console.log('sleepTimeSlots:', sleepTimeSlots)
    const timeSlotView = timeType === 'Wake Up' ? wakeupTimeSlots : sleepTimeSlots

    return (
        <Select onValueChange={(value) => handleTimeChange({ target: { value } })}>
      <SelectTrigger className="inline-flex items-center justify-start w-full py-2 px-5 me-2 text-sm max-sm:text-xs text-black/70 border-gray-200 border focus:outline-none bg-white text-black rounded-lg hover:bg-gray-100 hover:text-third focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-md transition-colors">
        <Clock className="w-6 h-6 mr-2" />
        <SelectValue placeholder={time}>{time}</SelectValue>
      </SelectTrigger>
      <SelectContent className="h-[20em] overflow-auto">
        <SelectGroup>
          {timeSlotView.map((slot) => (
            <SelectItem
              key={slot.id}
              value={slot.id}
              className="cursor-pointer hover:bg-third/10"
            >
              {slot.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    );
}