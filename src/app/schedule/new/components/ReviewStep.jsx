'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import StepNavigation from '../test/components/StepNavigation';
import { Activity, CalendarSync, Clock, Goal, Target, UserRoundPen } from 'lucide-react';
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
  const router = useRouter();
  const formData = useSelector(state => state.scheduleModule.multiStepForm);

  const handleGenerateSchedule = () => {
    // TODO: Implement schedule generation logic
    router.push('/schedule/view');
  };

  return (
    <Section className={"pt-6 w-full md:p-6"}>

      <div className="space-y-5 md:space-y-10">
        <div className="mb-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl dark:text-white">Review your schedule before submitting</h2>
          {/* <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Verify your preferences, goals, and routines before generating your schedule</p> */}
        </div>

        <div className="space-y-5 md:space-y-10">
          {/* Preferences Section */}
          <div className="p-3 text-sm bg-white rounded-lg shadow-md md:p-5 dark:bg-gray-800">
            <h3 className="flex gap-2 items-center mb-4 text-base font-medium md:text-lg">
              <UserRoundPen className="w-5 h-5" />
              Preferences
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Wake-Up:</span>
                <span className="font-medium">
                  {formatTime(formData.preferences.wakeup)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Sleep:</span>
                <span className="font-medium">
                  {formatTime(formData.preferences.sleep)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Intensity:</span>
                <span className="font-medium capitalize">{formData.preferences.intensity || 'Not set'}</span>
              </div>
            </div>
          </div>

          {/* Goals Section */}
          <div className="p-3 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="flex gap-2 items-center mb-4 text-base font-medium md:text-lg">
              <Goal className="w-5 h-5" />
              Goals
            </h3>
            {formData.goals.length > 0 ? (
              <div className="space-y-1.5 md:space-y-3 w-full">
                {formData.goals.map((goal, index) => (
                  <div key={goal.id}>
                    <div
                      className="flex justify-between items-center p-1 rounded-lg bg-gray-50/50 dark:bg-gray-700/50"
                    >
                      <span>{goal.name}</span>
                      <span className={`
                        text-sm px-2 py-1 rounded-full
                        ${goal.importance === 'high'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : goal.importance === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }
                      `}>
                        {goal.importance}
                      </span>
                    </div>
                    {index < formData.goals.length - 1 && (
                      <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-600 my-1" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No goals added</p>
            )}
          </div>

          {/* Routines Section */}
          <div className="p-3 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="flex gap-2 items-center mb-4 text-base font-medium md:text-lg">
              <CalendarSync className="w-5 h-5" />
              Routines
            </h3>
            {formData.routines.length > 0 ? (
              <div className="space-y-1.5 md:space-y-3 w-full">
                {formData.routines.map((routine, index) => (
                  <div key={routine.id}>
                    <div
                      className="flex justify-between items-center p-1 rounded-lg bg-gray-50/50 dark:bg-gray-700/50"
                    >
                      <span>{routine.name}</span>
                      <span className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300">
                        {formatTime(routine.startTime)}
                        {' - '}
                        {formatTime(routine.endTime)}
                      </span>
                    </div>
                    {index < formData.routines.length - 1 && (
                      <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-600 my-1" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No routines added</p>
            )}
          </div>
        </div>

        {/* <StepNavigation
        onNext={handleGenerateSchedule}
        onBack={onBack}
        isFirstStep={isFirstStep}
        isLastStep={true}
        /> */}
      </div>
    </Section>
  );
}
