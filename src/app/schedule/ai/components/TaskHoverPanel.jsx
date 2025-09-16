import { 
  useFloating, 
  offset, 
  flip, 
  shift
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Edit3, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

export function TaskHoverPanel({ 
  isOpen = true, 
  onOpenChange, 
  referenceElement, 
  task, 
  onAction,
  onPanelEnter,
  onPanelLeave
}) {
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [
      offset(0), // No gap between task and panel
      flip(),
      shift({ padding: 8 })
    ]
  });

  // Set the reference element when it changes
  useEffect(() => {
    if (referenceElement) {
      refs.setReference(referenceElement);
    }
  }, [referenceElement, refs]);

  const handleAction = (action, e) => {
    e.stopPropagation();
    onAction(action, task);
    onOpenChange(false);
  };

  if (!task) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{...floatingStyles, pointerEvents: 'auto'}}
          className="z-[100]"
          onMouseEnter={onPanelEnter}
          onMouseLeave={onPanelLeave}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              duration: 0.2
            }}
            className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg dark:shadow-black/25 overflow-hidden"
            style={{ minWidth: '200px' }}
          >
            <div className="flex items-center gap-1 p-2">
              <button
                onClick={(e) => handleAction('suggestions', e)}
                className="flex items-center gap-2 px-3 py-0 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-150 font-medium min-h-[40px]"
              >
                <Lightbulb className="w-4 h-4" />
                Suggest task
              </button>
              
              
              <button
                onClick={(e) => handleAction('edit', e)}
                className="flex items-center gap-2 px-3 py-0 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-150 font-medium min-h-[40px]"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              
              
              <button
                onClick={(e) => handleAction('delete', e)}
                className="flex items-center gap-2 px-3 py-0 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors duration-150 font-medium min-h-[40px]"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )} 
    </AnimatePresence>
  );
}
