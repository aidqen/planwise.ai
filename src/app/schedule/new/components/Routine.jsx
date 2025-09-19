import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import TaskPreview from '@/components/tasks/TaskPreview'
import TaskEdit from '@/components/tasks/TaskEdit'

export function Routine({
  routine,
  deleteRoutine,
  toggleEditing,
  saveEdit,
}) {
  return (
    <motion.div
      key={routine.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative transition-shadow duration-300 h-max hover:shadow-lg dark:bg-transparent border-transparent">
        {routine.isEditing ? (
          <TaskEdit
            id={routine.id}
            defaultName={routine.name}
            defaultStartTime={routine.startTime}
            defaultEndTime={routine.endTime}
            nameLabel="Routine Name"
            onCancel={(id) => toggleEditing(id, false)}
            onSave={(id, data) => saveEdit(id, { name: data.name, startTime: data.startTime, endTime: data.endTime })}
          />
        ) : (
          <TaskPreview
            task={{ id: routine.id, name: routine.name, startTime: routine.startTime, endTime: routine.endTime }}
            onEdit={(id) => toggleEditing(id, true)}
            onDelete={(id) => deleteRoutine(id)}
          />
        )}
      </Card>
    </motion.div>
  )
}
