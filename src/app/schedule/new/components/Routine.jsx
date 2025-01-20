import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Clock, Edit2, X } from 'lucide-react'
import { RoutineEdit } from './RoutineEdit'
import { RoutinePreview } from './RoutinePreview'

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
      <Card className="relative shadow-md transition-shadow duration-300 h-max hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/30">
        {routine.isEditing ? (
          <RoutineEdit routine={routine} toggleEditing={toggleEditing} saveEdit={saveEdit} />
        ) : (
          <RoutinePreview routine={routine} deleteRoutine={deleteRoutine} toggleEditing={toggleEditing} />
        )}
      </Card>
    </motion.div>
  )
}
