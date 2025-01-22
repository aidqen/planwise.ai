import { CardTitle } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { Pen } from "lucide-react";

export function EditableTitle({ title, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const inputRef = useRef(null);

  // Always sync with parent title
  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (localTitle.trim() !== title) {
        onSave?.('name', localTitle.trim());
      }
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setLocalTitle(title);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (localTitle.trim() !== title) {
      onSave?.('name', localTitle.trim());
    }
  };

  return (
    <div className="group relative flex items-center gap-2">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="px-1 py-0.5 text-xl font-semibold bg-transparent border-b-2 border-blue-500 outline-none text-gray-900 dark:text-gray-100"
        />
      ) : (
        <div className="flex items-center gap-2 group">
          <CardTitle
            onClick={() => setIsEditing(true)}
            className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {title}
          </CardTitle>
          <Pen 
            className="w-4 h-4 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer" 
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
    </div>
  );
}
