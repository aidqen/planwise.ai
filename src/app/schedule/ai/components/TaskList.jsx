import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Pen } from "lucide-react";



export function TaskList({ tasks, wakeupMinutes, handleTaskClick }) {

    const [groupedTasks, setGroupedTasks] = useState([]);



    useEffect(() => {

        const sortedTasks = [...tasks].sort((a, b) => {

            const aStart = parseTimeToMinutes(a.start);

            const bStart = parseTimeToMinutes(b.start);

            return aStart - bStart;

        });



        // Create an array of columns where tasks are placed

        const columns = [];



        sortedTasks.forEach(task => {

            // Try to find the first column where the task fits without overlapping

            let placed = false;

            for (const column of columns) {

                if (!column.some(colTask => tasksOverlap(task, colTask))) {

                    column.push(task);

                    placed = true;

                    break;

                }

            }



            // If no column was found, create a new one

            if (!placed) {

                columns.push([task]);

            }

        });



        setGroupedTasks(columns);

    }, [tasks]);



    const parseTimeToMinutes = (time) => {

        const [hours, minutes] = time.split(":").map(Number);

        return hours * 60 + minutes;

    };



    const tasksOverlap = (task1, task2) => {

        const start1 = parseTimeToMinutes(task1.start);

        const end1 = parseTimeToMinutes(task1.end);

        const start2 = parseTimeToMinutes(task2.start);

        const end2 = parseTimeToMinutes(task2.end);



        return start1 < end2 && start2 < end1; // True if tasks overlap

    };



    return (

        <div className="relative h-full">

            {groupedTasks.map((column, columnIndex) => (

                <div key={columnIndex} className="absolute top-0 left-0 w-full h-full">

                    {column.map((task) => (

 
                                    <div> {/* wrapper div for trigger */}
                                        <TaskCard 
                                            task={task}

                                            wakeupMinutes={wakeupMinutes}

                                            handleTaskClick={handleTaskClick}

                                            columnIndex={columnIndex}

                                            totalColumns={groupedTasks.length}

                                        />

                                    </div>


                    ))}

                </div>

            ))}

        </div>

    );

}

