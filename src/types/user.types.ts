export type RootState = {
    scheduleModule: {
        multiStepForm: {
            preferences: {
                intensity?: IntensityValue | null
            }
        }
    }
    userModule: {
        user?: {
            _id: string
            name: string
            email: string
            updatedAt: string
            preferences?: {
                intensity?: IntensityValue | null
            }
            schedules: UserScheduleType[]
            routines: []
            goals: []
            image: string
        }
    }
}

export type IntensityValue = "relaxed" | "moderate" | "intense"

export interface ScheduleType {

}

export interface UserScheduleType {
    id: string;
    name: string;
    preferences: {
        wakeup: string;
        sleep: string;
        intensity: string;
    };
    updatedAt: string;
    createdAt: string;
    routines: [];
}

interface RoutineType {
    id: string;
    isEditing: boolean;
    text?: string;
    name?: string;
    startTime: string;
    endTime: string;
}