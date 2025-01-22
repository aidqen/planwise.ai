import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import TimePicker from "@/components/TimePicker";

export function AddRoutine({ newRoutine, setNewRoutine, addRoutine, multiStepForm }) {
  const [endTimeError, setEndTimeError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const { preferences } = multiStepForm;

  const { startTime, endTime } = newRoutine;

  useEffect(() => {
    validateStartEndTime();
  }, [startTime, endTime]);

  // Helper function to convert time string to minutes since midnight
  function timeToMinutes(time) {
    const [hours, minutes] = time?.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Helper function to extract hours from time string
  function getHourFromTime(time) {
    return parseInt(time?.split(':')[0]);
  }

  function validateStartEndTime() {
    if (!startTime || !endTime) return; // Skip validation if inputs are incomplete

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const wakeupMinutes = timeToMinutes(preferences.wakeup);
    const sleepMinutes = timeToMinutes(preferences.sleep);

    // Check if startTime is before wakeup time
    if (startMinutes < wakeupMinutes) {
      setStartTimeError(true);
    } else {
      setStartTimeError(false);
    }

    // Check if startTime is after or equal to endTime
    if (startMinutes >= endMinutes) {
      setEndTimeError(true);
    } else {
      setEndTimeError(false);
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    validateStartEndTime();

    // Prevent form submission if there are any errors
    if (startTimeError || endTimeError) {
      return;
    }

    addRoutine(); // Submit routine if validations pass
  }

  const wakeupHour = getHourFromTime(preferences.wakeup);
  const sleepHour = getHourFromTime(preferences.sleep);

  return (
    <Card className="w-full bg-transparent rounded-xl border-0 shadow-none transition-all duration-300">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="routineName"
              className="text-sm font-semibold text-gray-700 dark:text-white"
            >
              Routine Name
            </Label>
            <Input
              id="routineName"
              placeholder="e.g., Morning Workout, Team Meeting"
              value={newRoutine.name}
              onChange={e => setNewRoutine({ ...newRoutine, name: e.target.value })}
              required
              className="px-4 py-2 h-11 rounded-lg border border-gray-200 dark:border-indigo-500/20 dark:bg-gray-800 dark:border-gray-700 dark:text-indigo-100 shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-indigo-300/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Start Time Input */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="startTime"
                className="text-sm font-semibold text-gray-700 dark:text-white"
              >
                Start Time
              </Label>
              <div className="relative">
                <TimePicker
                  value={startTime}
                  onChange={(value) => setNewRoutine({ ...newRoutine, startTime: value })}
                  startHour={wakeupHour}
                  endHour={sleepHour}
                  placeholder="Select start time"
                  className={startTimeError ? 'border-red-500 dark:border-red-400/50 focus-within:ring-red-500' : ''}
                />
                <AnimatePresence>
                  {startTimeError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -10 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-[120%] left-0 w-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-300 text-sm rounded-lg shadow-lg px-3 py-2 border border-red-200 dark:border-red-500/30"
                    >
                      Start time must be after wakeup time.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* End Time Input */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="endTime"
                className="text-sm font-semibold text-gray-700 dark:text-white"
              >
                End Time
              </Label>
              <div className="relative">
                <TimePicker
                  value={endTime}
                  onChange={(value) => setNewRoutine({ ...newRoutine, endTime: value })}
                  startHour={startTime ? getHourFromTime(startTime) : wakeupHour}
                  endHour={sleepHour}
                  placeholder="Select end time"
                  className={endTimeError ? 'border-red-500 dark:border-red-400/50 focus-within:ring-red-500' : ''}
                />
                <AnimatePresence>
                  {endTimeError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -10 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-[120%] left-0 w-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-300 text-sm rounded-lg shadow-lg px-3 py-2 border border-red-200 dark:border-red-500/30"
                    >
                      End time must be later than start time.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 font-medium text-white dark:bg-blue-700 bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            <Plus className="mr-2 w-5 h-5" /> Add Routine
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
