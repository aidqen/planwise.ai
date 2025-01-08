import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { motion } from 'framer-motion'

export function SaveToCalendarBtn({ toggleCalendarDialog, isVisible }) {

    return <>
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:hidden">
            <Button
                onClick={toggleCalendarDialog}
                className="text-gray-100 bg-green-500 shadow-xl z-[100] transition-all hover:scale-[1.02] duration-100 hover:shadow-xl"
            >
                <CalendarIcon />
                Add To Calendar
            </Button>
        </div>

        <div className="hidden md:block z-50 sticky bottom-0">
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
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
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