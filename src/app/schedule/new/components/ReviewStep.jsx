'use client';

import { Calendar as CalendarIcon, CalendarSync, Goal, Info, UserRoundPen } from 'lucide-react';
import { useSelector } from 'react-redux';
import FormWrapper from '@/components/FormWrapper'
import { formatTime } from '@/lib/utils'
import ReviewSection from '@/components/review/ReviewSection'
import ReviewListItem from '@/components/review/ReviewListItem'

export default function ReviewStep({ }) {
  const formData = useSelector(state => state.scheduleModule.multiStepForm);
  const googleEvents = formData?.googleEvents || [];

  return (
    <FormWrapper
      title="Review Your Schedule"
      description="Check your preferences, goals, and routines before generating your schedule."
    >
      <div className="space-y-6 overflow-y-auto max-h-[55vh] md:max-h-[55vh] sm:max-h-[55vh] py-3 scrollbar-hidden scrollbar">
        {/* Preferences Section */}
        <ReviewSection
          title="Preferences"
          icon={<UserRoundPen className="w-5 h-5 text-blue-500 dark:text-blue-400" />}
        >
          <div className="space-y-3">
            <ReviewListItem label="Wake-Up" value={formatTime(formData.preferences.wakeup)} />
            <ReviewListItem label="Sleep" value={formatTime(formData.preferences.sleep)} />
            <ReviewListItem label="Intensity" value={formData.preferences.intensity || 'Not set'} />
          </div>
        </ReviewSection>

        {/* Goals Section */}
        <ReviewSection
          title="Goals"
          icon={<Goal className="w-5 h-5 text-green-500 dark:text-green-400" />}
        >
          {formData.goals.length > 0 ? (
            <div className="space-y-2">
              {formData.goals.map((goal) => (
                <ReviewListItem
                  key={goal.id}
                  label={goal.name}
                  value={
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${goal.importance === 'high'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                      : goal.importance === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                      }`}>
                      {goal.importance}
                    </span>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg md:p-4 bg-gray-50/80 dark:bg-gray-800/80">
              <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">No Goals added yet</span>
            </div>
          )}
        </ReviewSection>

        {/* Routines Section */}
        <ReviewSection
          title="Routines"
          icon={<CalendarSync className="w-5 h-5 text-purple-500 dark:text-purple-400" />}
        >
          {formData.routines.length > 0 ? (
            <div className="space-y-2">
              {formData.routines.map((routine) => (
                <ReviewListItem
                  key={routine.id}
                  label={routine.name}
                  value={
                    <span className="px-3 py-1 text-xs font-medium text-gray-600 whitespace-nowrap bg-gray-100 rounded-full dark:text-gray-400 dark:bg-gray-700/80">
                      {formatTime(routine.startTime)}{' - '}{formatTime(routine.endTime)}
                    </span>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg md:p-4 bg-gray-50/80 dark:bg-gray-800/80">
              <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">No Routines added yet</span>
            </div>
          )}
        </ReviewSection>

        {/* Google Events Section */}
        <ReviewSection
          title="Google Calendar Events"
          icon={<img src="/google-icon-logo-svgrepo-com.svg" alt="Google" className="h-5 w-5" />}
        >
          {googleEvents.length > 0 ? (
            <div className="space-y-2">
              {formData.googleEvents.map((event) => (
                <ReviewListItem
                  key={event.id}
                  label={event.summary || 'Untitled event'}
                  value={
                    <span className="px-3 py-1 text-xs font-medium whitespace-nowrap bg-gray-100 rounded-full text-gray-700 dark:bg-gray-700/80 dark:text-gray-200">
                      {event.start && event.end ? `${event.start} - ${event.end}` : event.start || event.end || 'No time provided'}
                    </span>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg md:p-4 bg-gray-50/80 dark:bg-gray-800/80">
              <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">No Google events imported yet</span>
            </div>
          )}
        </ReviewSection>
      </div>
    </FormWrapper>
  );
}

const emptyState = (title) => (
  <div className="flex items-center gap-2 p-3 rounded-lg md:p-4 bg-gray-50/80 dark:bg-gray-800/80">
    <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
    <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
  </div>
)