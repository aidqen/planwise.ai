'use client'
import { useRef, useEffect, useState, useMemo } from 'react'
import { Check, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command"
import { RoutineCreationDropdown } from './RoutineCreationDropdown'

export function RoutineSearchInput({
  routines,
  onAddRoutine,
  multiStepForm,
  userRoutines = []
}) {
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentRoutine, setCurrentRoutine] = useState({
    name: '',
    startTime: '',
    endTime: ''
  })

  // Filter user routines based on search and existing routines
  const filteredUserRoutines = useMemo(() => {
    if (currentRoutine.name.trim()) {
      return userRoutines.filter(routine =>
        routine.name.toLowerCase().includes(currentRoutine.name.toLowerCase()) &&
        !routines.some(r => r.id === routine.id)
      );
    }
    return userRoutines.filter(routine =>
      !routines.some(r => r.id === routine.id)
    );
  }, [userRoutines, currentRoutine.name, routines]);

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
  }, []);

  function formatTime(time) {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours) % 12 || 12
    const period = parseInt(hours) < 12 ? 'AM' : 'PM'
    return `${hour}:${minutes} ${period}`
  }

  function handleCreateRoutine() {
    if (currentRoutine.name && currentRoutine.startTime && currentRoutine.endTime) {
      onAddRoutine(currentRoutine)
      setCurrentRoutine({ name: '', startTime: '', endTime: '' })
      setIsDropdownOpen(false)
    }
  }

  function handleAddExistingRoutine(routine) {
    onAddRoutine(routine)
    setCurrentRoutine({ name: '', startTime: '', endTime: '' })
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        placeholder="Add a new routine..."
        value={currentRoutine.name}
        onChange={(e) => {
          setCurrentRoutine(prev => ({ ...prev, name: e.target.value }))
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
              {currentRoutine.name.trim() && (
                <CommandEmpty className="py-0">
                  <RoutineCreationDropdown
                    currentRoutine={currentRoutine}
                    setCurrentRoutine={setCurrentRoutine}
                    onCreateRoutine={handleCreateRoutine}
                    multiStepForm={multiStepForm}
                  />
                </CommandEmpty>
              )}
              {filteredUserRoutines.length > 0 && (
                <CommandGroup
                  heading="Existing Routines"
                  className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  {filteredUserRoutines.map((routine) => (
                    <CommandItem
                      key={routine.id}
                      value={routine.name}
                      onSelect={() => handleAddExistingRoutine(routine)}
                      className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md"
                    >
                      <div className="flex items-center">
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-gray-400 dark:text-gray-500",
                            routines.some(r => r.id === routine.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          {routine.name}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(routine.startTime)} - {formatTime(routine.endTime)}</span>
                      </div>
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
