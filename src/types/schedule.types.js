import { z } from 'zod';

// Define the Schedule Task schema for individual tasks in the schedule
export const ScheduleTaskSchema = z.object({
    // id: z.string(),
    summary: z.string(),
    start: z.string(), // Time format like "10:00"
    end: z.string(),   // Time format like "10:15"
    category: z.enum(['break', 'meal', 'goal', 'routine'])
});

// Define the Routine schema
export const RoutineSchema = z.object({
    name: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    id: z.union([z.string(), z.number()]), // Can be string or number
    isEditing: z.boolean().optional()
});

// Define the Goal schema
export const GoalSchema = z.object({
    id: z.string(),
    name: z.string(),
    importance: z.enum(['low', 'medium', 'high'])
});

// Define the Creator schema
export const CreatorSchema = z.object({
    id: z.string(),
    name: z.string()
});

// Define the complete Schedule schema based on the provided data structure
export const ScheduleSchema = z.object({
    _id: z.object({
        $oid: z.string()
    }).optional(),
    name: z.string(),
    schedule: z.array(ScheduleTaskSchema),
    createdAt: z.number(),
    updatedAt: z.number(),
    preferences: z.object({
        wakeup: z.string(),
        sleep: z.string(),
        intensity: z.enum(['low', 'moderate', 'intense'])
    }),
    routines: z.array(RoutineSchema).default([]),
    goals: z.array(GoalSchema).default([]),
    creator: CreatorSchema,
    chat: z.array(z.any()).default([])
});

// Export types derived from the schemas
export const scheduleTypes = {
    ScheduleTask: z.infer(typeof ScheduleTaskSchema),
    Routine: z.infer(typeof RoutineSchema),
    Goal: z.infer(typeof GoalSchema),
    Creator: z.infer(typeof CreatorSchema),
    Schedule: z.infer(typeof ScheduleSchema)
};

export default ScheduleSchema;
