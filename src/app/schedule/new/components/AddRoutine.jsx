'use client'
import { useEffect, useState, useMemo } from "react";
import { RoutineSearchInput } from "./RoutineSearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { TimePicker } from "@/components/TimePicker";

export function AddRoutine({ newRoutine, setNewRoutine, addRoutine, onAddExistingRoutine, multiStepForm, user }) {
  const [endTimeError, setEndTimeError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { preferences } = multiStepForm;
  const { routines } = multiStepForm;

  const { startTime, endTime } = newRoutine;

  const filteredUserRoutines = useMemo(() => {
    const userRoutines = user?.routines || [];
    if (newRoutine.name.trim()) {
      return userRoutines.filter(routine =>
        routine.name.toLowerCase().includes(newRoutine.name.toLowerCase()) &&
        !routines.some(r => r.id === routine.id)
      );
    } else {
      return userRoutines.filter(routine =>
        !routines.some(r => r.id === routine.id)
      );
    }
  }, [user?.routines, newRoutine.name, routines]);

  useEffect(() => {
    validateStartEndTime();
  }, [startTime, endTime]);

  // Helper function to convert time string to minutes since midnight
  function timeToMinutes(time) {
    const [hours, minutes] = time?.split(':').map(Number);
    return hours * 60 + minutes;
  }

  function validateStartEndTime() {
    if (!startTime || !endTime) return;

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const wakeupMinutes = timeToMinutes(preferences.wakeup);

    if (startMinutes < wakeupMinutes) {
      setStartTimeError(true);
    } else {
      setStartTimeError(false);
    }

    if (startMinutes >= endMinutes) {
      setEndTimeError(true);
    } else {
      setEndTimeError(false);
    }
  }

  function handleCreateRoutine() {
    validateStartEndTime();

    if (startTimeError || endTimeError || !newRoutine.name.trim() || !startTime || !endTime) {
      return;
    }

    addRoutine();
  }

  function handleAddRoutine(routine) {
    onAddExistingRoutine(routine);
    setNewRoutine({
      name: '',
      startTime: '',
      endTime: ''
    });
    setIsDropdownOpen(false);
  }

  return (
    <RoutineSearchInput
      currentRoutine={newRoutine}
      setCurrentRoutine={setNewRoutine}
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
      filteredUserRoutines={filteredUserRoutines}
      routines={routines}
      onAddRoutine={handleAddRoutine}
      onCreateRoutine={handleCreateRoutine}
      multiStepForm={multiStepForm}
    />
  );
}
