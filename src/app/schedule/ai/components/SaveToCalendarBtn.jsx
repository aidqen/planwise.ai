import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { motion } from 'framer-motion'

export function SaveToCalendarBtn({ toggleCalendarDialog, isVisible }) {

    return <>
        <div className="flex fixed right-0 left-0 bottom-6 z-50 justify-center md:hidden">
            <Button
                onClick={toggleCalendarDialog}
                className="text-gray-100 bg-green-500 shadow-xl z-[100] transition-all hover:scale-[1.02] duration-100 hover:shadow-xl"
            >
                <CalendarIcon />
                Add To Calendar
            </Button>
        </div>

        <div className="hidden sticky bottom-6 z-50 w-full md:block">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ?
                    { opacity: 1, y: 0, scale: 1 } :
                    { opacity: 0, y: 50, scale: 0.95 }
                }
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 1
                }}
                className="flex justify-center"
            >
                <Button
                    onClick={toggleCalendarDialog}
                    className="text-gray-100 bg-green-500 z-[100] shadow-md transition-all hover:scale-[1.02] duration-100 hover:shadow-xl"
                >
                    <CalendarIcon />
                    Add To Calendar
                </Button>
            </motion.div>
        </div>
    </>
}