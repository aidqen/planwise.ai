import { CardTitle } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { Pen } from "lucide-react";

export function EditableTitle({ title, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const inputRef = useRef(null);

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
      if (localTitle.trim() && localTitle !== title) {
        onSave?.('name', localTitle.trim());
      }
      setIsEditing(false);
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setLocalTitle(title);
    }
  };

  const handleBlur = () => {
    if (localTitle.trim() && localTitle !== title) {
      onSave?.('name', localTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="flex relative gap-2 w-max max-w-[70%] md:max-w-[50%] items-center group">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="px-1 py-0.5 text-xl font-semibold bg-transparent border-b-2 border-blue-500 outline-none text-gray-900 dark:text-gray-100 w-full"
        />
      ) : (
        <div className="flex gap-1 items-center group w-full">
          <CardTitle
            onClick={() => setIsEditing(true)}
            className="transition-colors duration-200 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis hover:text-blue-600 dark:hover:text-blue-400 w-full"
            title={title} // Show full title on hover
          >
            {title}
          </CardTitle>
          <Pen 
            className=" w-6 h-6 text-gray-400 transition-colors duration-200 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400" 
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
    </div>
  );
}
