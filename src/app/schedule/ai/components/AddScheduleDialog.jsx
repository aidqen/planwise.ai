"use client";

import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { CalendarIcon, Sparkles } from "lucide-react";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { scheduleService } from "@/services/scheduleService";

export function AddScheduleDialog({ open, onOpenChange: setOpen, schedule }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Create date in the correct timezone
  const [date, setDate] = useState(() => {
    const now = new Date();
    // Format the date in the target timezone
    const formattedDate = formatInTimeZone(now, timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
    return new Date(formattedDate);
  });

  console.log("🚀 ~ file: AddScheduleDialog.jsx:16 ~ date:", date)
  const [isLoading, setIsLoading] = useState(false)

  async function saveScheduleToCalendar() {
    try {
      setIsLoading(true)
      await scheduleService.sendTasksToCalendar(schedule?.schedule, date, timezone);
      setIsLoading(false)
      setOpen(false);
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert("Failed to add schedule to Google Calendar.");
    }
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => !popoverOpen && setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="overflow-y-auto fixed inset-0">
          <div className="flex justify-center items-center p-4 min-h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="overflow-hidden p-6 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform">
                <Dialog.Title className="w-full text-lg font-semibold leading-6 text-center text-gray-900 max-sm:text-lg">
                  Add to Google Calendar
                </Dialog.Title>
                <div className="mt-4 space-y-4">
                  {/* Date Picker */}
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "pl-3 w-full font-normal text-left border-gray-200",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          setPopoverOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* Add to Calendar Button */}
                  <div className="grid grid-cols-[2fr_1fr] items-center gap-2 w-full">

                    <Button
                      onClick={saveScheduleToCalendar}
                      className="w-full bg-[#1a73e8] col-start-1 shadow-md hover:bg-[#1557b0] text-white font-medium py-2"
                    >
                      {isLoading ? (<>
                        <Sparkles className="mr-2" />
                        <span>Add to Calendar</span>
                      </>
                      ) : <span>Add to Calendar</span>}
                    </Button>
                    <Button
                      onClick={() => setOpen(false)}
                      className="w-full bg-white border col-start-2 border-gray-200 text-black shadow-md hover:bg-gray-100 transition-colors duration-200 font-medium py-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
