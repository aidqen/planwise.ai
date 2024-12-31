'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ItemList({ items, renderItem, initialItemsToShow = 5 }) {
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

  const showMoreItems = () => {
    setItemsToShow(prevItems => prevItems + 5);
  };

  return (
    <div>
      <AnimatePresence>
        {items.slice(0, itemsToShow).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
      {itemsToShow < items.length && (
        <Button 
          onClick={showMoreItems} 
          variant="ghost" 
          size="sm"
          className="mt-1 w-full h-6 text-xs text-gray-500 hover:text-gray-700"
        >
          Show {items.length - itemsToShow} more
        </Button>
      )}
    </div>
  );
}
