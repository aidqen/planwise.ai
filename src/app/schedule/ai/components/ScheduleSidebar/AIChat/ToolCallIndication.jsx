import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ToolCallIndication({
     toolName = "hello" 
    }) {
        const [displayText, setDisplayText] = useState(toolName ? `Called tool ${toolName}` : null);
    
    useEffect(() => {
        let interval;
        
        if (toolName) {
            setDisplayText(`Called tool ${toolName}`);

            interval = setInterval(() => {
                setDisplayText(current => {
                    const currentText = current.replace(/\.+$/, '');
                    const currentDots = current.match(/\.+$/) ? current.match(/\.+$/)[0] : '';
                    
                    if (currentDots === '') return `${currentText}.`;
                    if (currentDots === '.') return `${currentText}..`;
                    if (currentDots === '..') return `${currentText}...`;
                    return currentText;
                });
            }, 200);
        } else {
            setDisplayText(null);
        }
        
        return () => clearInterval(interval);
    }, [toolName]);
    
    if (!displayText) return null;
    
    return (
        <p className="w-full mb-2 mt-0 px-0 text-xs text-gray-700 dark:text-gray-500">
            {displayText.split('').map((t, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.6, 1, 0.3] }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.04,
                        repeatType: "reverse"
                    }}
                >
                    {t}
                </motion.span>
            ))}
        </p>
    );
}
