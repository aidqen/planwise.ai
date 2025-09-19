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
            name: string
            preferences?: {
                intensity?: IntensityValue | null
            }
        }
    }
}

export type IntensityValue = "relaxed" | "moderate" | "intense"