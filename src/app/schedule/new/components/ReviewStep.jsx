'use client';

import { CalendarSync, Goal, UserRoundPen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Section } from '@/components/ui/section';

const formatTime = (time) => {
  if (!time) return 'Not set';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

export default function ReviewStep({ }) {
  const formData = useSelector(state => state.scheduleModule.multiStepForm);

  return (
    <Section className="pt-6 mx-auto w-full max-w-2xl md:p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl">
            Review Your Schedule
          </h2>
          <p className="mt-2 text-sm text-gray-600 md:text-base dark:text-gray-400">
            Check your preferences, goals, and routines before generating your schedule.
          </p>
        </div>

        <div className="space-y-4">
          {/* Preferences Section */}
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm md:p-5 dark:bg-gray-800/50 dark:border-gray-700/50">
            <h3 className="flex gap-2 items-center mb-5 text-base font-medium text-gray-900 dark:text-gray-100 md:text-lg">
              <UserRoundPen className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              Preferences
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Wake-Up', value: formData.preferences.wakeup },
                { label: 'Sleep', value: formData.preferences.sleep },
                { label: 'Intensity', value: formData.preferences.intensity }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center p-3 rounded-lg transition-colors duration-200 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.label === 'Intensity' ? (item.value || 'Not set') : formatTime(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Section */}
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm md:p-5 dark:bg-gray-800/50 dark:border-gray-700/50">
            <h3 className="flex gap-2 items-center mb-5 text-base font-medium text-gray-900 dark:text-gray-100 md:text-lg">
              <Goal className="w-5 h-5 text-green-500 dark:text-green-400" />
              Goals
            </h3>
            {formData.goals.length > 0 ? (
              <div className="space-y-2">
                {formData.goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex justify-between items-center p-3 rounded-lg transition-colors duration-200 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/50"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{goal.name}</span>
                    <span className={`
                      text-xs px-3 py-1 rounded-full font-medium
                      ${goal.importance === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                        : goal.importance === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                      }
                    `}>
                      {goal.importance}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center p-3 rounded-lg md:p-4 bg-gray-50/80 dark:bg-gray-800/80">
                <span className="text-sm text-gray-500 dark:text-gray-400">No goals added yet</span>
              </div>
            )}
          </div>

          {/* Routines Section */}
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm md:p-5 dark:bg-gray-800/50 dark:border-gray-700/50">
            <h3 className="flex gap-2 items-center mb-5 text-base font-medium text-gray-900 dark:text-gray-100 md:text-lg">
              <CalendarSync className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              Routines
            </h3>
            {formData.routines.length > 0 ? (
              <div className="space-y-2">
                {formData.routines.map((routine) => (
                  <div
                    key={routine.id}
                    className="flex justify-between items-center p-3 rounded-lg transition-colors duration-200 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/50"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{routine.name}</span>
                    <span className="px-3 py-1 text-xs font-medium text-gray-600 whitespace-nowrap bg-gray-100 rounded-full dark:text-gray-400 dark:bg-gray-700/80">
                      {formatTime(routine.startTime)}
                      {' - '}
                      {formatTime(routine.endTime)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center p-3 rounded-lg md:p-4 bg-gray-50/80 dark:bg-gray-800/80">
                <span className="text-sm text-gray-500 dark:text-gray-400">No routines added yet</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
