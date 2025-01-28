import React from 'react'
import { CollapsibleSection } from './CollapsibleSection'
import { EditablePreference } from './EditablePreference'
import { Sun, Moon,UserRoundPen, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const preferenceConfig = [
  {
    key: 'wakeup',
    icon: Sun,
    label: 'Wake up',
    iconClass: 'text-amber-500 dark:text-amber-400',
    type: 'time'
  },
  {
    key: 'sleep',
    icon: Moon,
    label: 'Sleep',
    iconClass: 'text-blue-500 dark:text-blue-400',
    type: 'time'
  },
  {
    key: 'intensity',
    icon: Zap,
    label: 'Intensity',
    iconClass: 'text-yellow-500 dark:text-yellow-400',
    type: 'intensity',
    options: ['relaxed', 'moderate', 'intense']
  }
]

export function PreferencesSection({ preferences, isOpen, onToggle, onSaveSchedule }) {
  console.log("🚀 ~ file: PreferencesSection.jsx:7 ~ preferences:", preferences)
  if (!preferences) return null

  function handlePreferenceEdit(key, newValue) {
    onSaveSchedule('preferences', {
      ...preferences,
      [key]: newValue
    })
  }

  return (
    <CollapsibleSection
      title="Schedule Preferences"
      icon={UserRoundPen}
      isOpen={isOpen}
      onToggle={onToggle}
      iconColor="#5fa8d3"
    >
      <div className="mt-3 space-y-3">
        {preferenceConfig.map(({ 
          key, 
          icon: Icon, 
          label, 
          iconClass, 
          type,
          options 
        }) => (
          <div 
            key={key}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/50"
          >
            <div className="flex gap-2 items-center">
              <Icon className={cn("w-4 h-4", iconClass)} />
              <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            </div>
            <EditablePreference 
              value={preferences?.[key]} 
              type={type} 
              handlePreferenceEdit={handlePreferenceEdit} 
              keyName={key}
              preferences={preferences}
              options={options}
            />
          </div>
        ))}
      </div>
    </CollapsibleSection>
  )
}