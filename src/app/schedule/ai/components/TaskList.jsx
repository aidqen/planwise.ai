import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

export function TaskList({ tasks, wakeupMinutes, handleTaskClick }) {
  const [groupedTasks, setGroupedTasks] = useState([]);

  useEffect(() => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const aStart = parseTimeToMinutes(a.start);
      const bStart = parseTimeToMinutes(b.start);
      return aStart - bStart;
    });

    const groups = [];
    sortedTasks.forEach(task => {
      const overlappingGroup = groups.find(group => 
        group.some(groupTask => tasksOverlap(task, groupTask))
      );

      if (overlappingGroup) {
        overlappingGroup.push(task);
      } else {
        groups.push([task]);
      }
    });

    setGroupedTasks(groups);
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

    return (start1 < end2 && start2 < end1) || (start2 < end1 && start1 < end2);
  };

  return (
    <div className="relative h-full">
      {groupedTasks.map((group, groupIndex) => (
        <div key={groupIndex}>
          {group.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              wakeupMinutes={wakeupMinutes}
              handleTaskClick={handleTaskClick}
              overlappingTasks={group}
            />
          ))}
        </div>
      ))}
    </div>
  );
}