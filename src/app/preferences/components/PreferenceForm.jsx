'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PreferenceForm({ onSubmit, initialPreferences }) {
  const [preferences, setPreferences] = useState(initialPreferences)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(preferences)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="wakeupTime">Wake up time</label>
        <Input
          id="wakeupTime"
          type="time"
          value={preferences.wakeupTime}
          onChange={(e) => setPreferences({ ...preferences, wakeupTime: e.target.value })}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="sleepTime">Sleep time</label>
        <Input
          id="sleepTime"
          type="time"
          value={preferences.sleepTime}
          onChange={(e) => setPreferences({ ...preferences, sleepTime: e.target.value })}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="intensity">Intensity</label>
        <Select
          value={preferences.intensity}
          onValueChange={(value) => setPreferences({ ...preferences, intensity: value })}
        >
          <SelectTrigger id="intensity">
            <SelectValue placeholder="Select intensity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600">Update Preferences</Button>
    </form>
  )
}

