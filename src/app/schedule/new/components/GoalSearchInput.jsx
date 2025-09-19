'use client'
import { useRef, useEffect } from 'react'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils"
import { getImportanceColor } from '@/services/util.service'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command"
import { GoalCreationDropdown } from './GoalCreationDropdown'

export function GoalSearchInput({
  currentGoal,
  setCurrentGoal,
  currentImportance,
  setCurrentImportance,
  isDropdownOpen,
  setIsDropdownOpen,
  filteredUserGoals,
  goals,
  onAddGoal,
  onCreateGoal,
}) {
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputRef.current && !inputRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsDropdownOpen])

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        placeholder="Add a new goal..."
        value={currentGoal}
        onChange={(e) => {
          setCurrentGoal(e.target.value)
          setIsDropdownOpen(true)
        }}
        onFocus={() => setIsDropdownOpen(true)}
        className="w-full dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder:text-gray-500"
      />
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full bg-white rounded-md border shadow-lg dark:bg-gray-800 dark:border-gray-700"
        >
          <Command className="dark:bg-gray-800">
            <CommandList className="overflow-y-auto max-h-[300px] dark:bg-gray-800">
              {currentGoal.trim() && (
                <CommandEmpty className="py-0">
                  <GoalCreationDropdown
                    currentGoal={currentGoal}
                    currentImportance={currentImportance}
                    setCurrentImportance={setCurrentImportance}
                    onCreateGoal={onCreateGoal}
                  />
                </CommandEmpty>
              )}
              {filteredUserGoals.length > 0 && (
                <CommandGroup
                  heading="Existing Goals"
                  className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  {filteredUserGoals.map((goal) => (
                    <CommandItem
                      key={goal.id}
                      value={goal.name}
                      onSelect={() => onAddGoal(goal)}
                      className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md"
                    >
                      <div className="flex items-center">
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-gray-400 dark:text-gray-500",
                            goals.some(g => g.id === goal.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          {goal.name}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "ml-2 text-center text-xs px-2 py-1 rounded-md",
                          getImportanceColor(goal.importance)
                        )}
                      >
                        {goal.importance}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}
