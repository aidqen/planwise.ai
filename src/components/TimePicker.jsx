'use client';

import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SLEEP, SET_WAKEUP } from '@/store/reducers/schedule.reducer';

export default function TimePicker({ timeType }) {
    // const [time, setTime] = useState(timeType === 'Wake Up' ? '7:00 AM' : '7:00 PM');
    const preferences = useSelector(state => state.scheduleModule.multiStepForm.preferences)
    const dispatch = useDispatch()
    const { wakeup, sleep } = preferences
    const time = timeType === 'Wake Up' ? wakeup : sleep

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
            const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
            const period = currentHour < 12 ? "AM" : "PM";

            slots.push({ id: `${formattedHour}-${period.toLowerCase()}`, label: `${formattedHour}:00 ${period}` });

            if (i < totalHours - 1) {
                slots.push({ id: `${formattedHour}-30-${period.toLowerCase()}`, label: `${formattedHour}:30 ${period}` });
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
        <Popover.Root>
            <Popover.Trigger className="inline-flex items-center justify-start w-full py-3 px-6 me-2 text-sm font-medium text-black/70 border-gray-200 border focus:outline-none bg-white text-black rounded-lg  hover:bg-gray-100 hover:text-third focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 shadow-md transition-colors">
                <Clock className="w-6 h-6 mr-2" />
                {time}
            </Popover.Trigger>
            <Popover.Content
                className=" bg-white border rounded-md shadow-lg"
                sideOffset={4}
                style={{ zIndex: 1050 }} // Set a high z-index to ensure it renders on top
            >
                <ul className="grid p-3 grid-cols-2 gap-4 my-5 h-[20em] overflow-auto z-[100] bg-white">
                    {timeSlotView.map((slot) => (
                        <li key={slot.id}>
                            <input
                                type="radio"
                                id={slot.id}
                                value={slot.label}
                                name="timetable"
                                checked={time === slot.id}
                                onChange={handleTimeChange}
                                className="hidden peer"
                            />
                            <label
                                htmlFor={slot.id}
                                className="inline-flex items-center justify-center w-[5.5em] py-[0.35em] px-2 text-base font-medium text-center bg-third border rounded-lg cursor-pointer text-white bg-secondary border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-third/90 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500 uppercase"
                            >
                                {slot.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </Popover.Content>
        </Popover.Root>
    );
}