import { useStickToBottomContext } from 'use-stick-to-bottom';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScrollToBottomButton() {
    const { isAtBottom, scrollToBottom } = useStickToBottomContext();

    return (
        <AnimatePresence>
            {!isAtBottom && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                        duration: 0.1, 
                        ease: "easeOut" 
                    }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
                    aria-label="Scroll to bottom"
                >
                    <ArrowDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
