export function editSchedulePrompt(currentSchedule, message) {
  const scheduleJson = JSON.stringify(currentSchedule, null, 2)
  console.log("🚀 ~ editSchedulePrompt ~ scheduleJson:", scheduleJson)

  return `You are an expert AI assistant specialized in daily schedule editing and optimization. Your task is to modify a schedule based on user instructions and return a valid array of schedule tasks.

## CURRENT SCHEDULE
${scheduleJson}

---------------

## USER REQUEST
${message}

---------------

## INSTRUCTIONS

1. **Analyze the Current Schedule and User Request**
   - Understand the user's request in ## USER REQUEST
   - Carefully review the existing schedule structure in ## CURRENT SCHEDULE
   - Identify which tasks need to be modified, added, removed, or rescheduled

2. **Rules for Editing Tasks:**
   - NEVER modify or move ANY tasks with category "routine" - these are FIXED and UNCHANGEABLE
   - The ONLY exception is if the user EXPLICITLY requests to change a SPECIFIC routine task
   - All schedule changes MUST work around existing routine tasks - treat routines as immovable blocks
   - Maintain existing time formats (e.g., "10:00", "14:30")
   - DO NOT CHANGE tasks labeled as "sleep" or "wakeup" unless the user specifically asks
   - Preserve the overall structure of the day (wake-up time, sleep time) unless explicitly requested

3. **Schedule Requirements:**
   - Ensure NO overlapping tasks
   - Fill EVERY minute from wake-up to sleep time with tasks (no gaps allowed)
   - Maintain three meals (breakfast, lunch, dinner) unless the user requests otherwise:
     * Breakfast: Within 1 hour of wake-up time
     * Lunch: Between 12:00 and 14:00
     * Dinner: Between 18:00 and 20:00
   - Each meal must be at least 30 minutes long
   - Include appropriate breaks between focused work sessions based on the schedule's intensity:
     * For intense schedules: Short 5-15 minute breaks
     * For medium schedules: Mix of short and longer breaks
     * For relaxed schedules: More frequent and longer breaks

4. **Category-Specific Guidelines:**
   - **Routines**: Keep fixed unless explicitly requested to change
   - **Meals**: Maintain at least 30 minutes duration with category "meal"
   - **Breaks**: Use descriptive names (e.g., "Short Break", "Relaxation Time", "Outdoor Walk") with category "break"
   - **Goals**: Allocate appropriate time based on importance with category "goal"

5. **Task Structure Requirements:**
   - Each task MUST have these properties:
     * summary: A clear, concise description of the task
     * start: Start time in format "HH:MM" (24-hour format)
     * end: End time in format "HH:MM" (24-hour format)
     * category: One of ['break', 'meal', 'goal', 'routine']

6. **Output Format:**
   - Return ONLY a valid JSON array of schedule tasks
   - Do NOT include any explanations or additional text
   - Tasks MUST be in chronological order
   - Ensure the output matches the TaskListSchema exactly

## OUTPUT EXAMPLE
[
  {
    "summary": "Morning Routine",
    "start": "07:00",
    "end": "08:00",
    "category": "routine"
  },
  {
    "summary": "Breakfast",
    "start": "08:00",
    "end": "08:30",
    "category": "meal"
  },
  {
    "summary": "Work on Project",
    "start": "08:30",
    "end": "10:30",
    "category": "goal"
  },
  {
    "summary": "Short Break",
    "start": "10:30",
    "end": "10:45",
    "category": "break"
  },
  {
    "summary": "Exercise",
    "start": "10:45",
    "end": "11:45",
    "category": "goal"
  }
]

Now, create a new schedule based on the user's request while following all the rules above. Return ONLY the array of tasks.`
}

export function taskSuggestionPrompt(goals) {
  const goalsJson = typeof goals === 'string' ? goals : JSON.stringify(goals, null, 2)
  return `
You generate action-focused task suggestions to help users achieve their goals.

User Goals JSON (read-only source of truth):
${goalsJson}

You must produce an object matching this schema exactly:
{
  "taskSuggestions": [
    {
      "title": string,
      "importance": "low" | "medium" | "high",
      "suggestedTasks": [
        {
          "summary": string,
          "description": string,
          "recommendedDurationMins": number
        }
      ] // exactly 5 items
    }
  ]
}

Field mapping rules (copy verbatim from each goal object):
- title = goal.name (exactly the same text)
- importance = goal.importance (must be one of: low | medium | high)

For each goal in User Goals JSON, return one object inside taskSuggestions with:
- suggestedTasks: exactly 5 tasks that move the user toward that goal.

Each suggestedTasks item must have:
- summary: imperative, 3–8 words
- description: 10–25 characters total
- recommendedDurationMins: integer ≥ 5 (use 5-minute increments only)

Hard constraints:
- Output JSON only. No prose, no markdown, no backticks.
- Do not add, remove, or rename fields.
- Keep task summaries unique within the same goal.
- Avoid dates, times, or day names.

Task quality rules:
- Make tasks atomic, specific, measurable, and progress-oriented.
- Make a variety of task durations, short ones (30-60 minutes) and longer ones (60-180 minutes)

Selection rules:
- Prioritize actions with highest expected impact toward the goal.
- Minimize dependencies and context switching.
- Prefer specific, directly executable steps over planning or vague research.
- Prefer actions with compounding benefits or clear progress signals.`
}

export function buildSchedulePrompt(preferences, routines, goals) {
  const prompt = `You are an AI assistant that generates optimized daily schedules based on the user's preferences, routines, and goals. Your task is to create a daily schedule that strictly respects routines, includes meals and morning/night routines, and effectively allocates time to goals based on their importance. Every hour of the day must be accounted for, with no gaps left unscheduled.

    **Preferences**:
- Wake: ${preferences.wakeup}
- Sleep: ${preferences.sleep}
- Intensity: ${preferences.intensity}

**Routines**:
${routines?.map(r => `Routine: ${r.name}: Start: ${r.startTime}, End: ${r.endTime}`).join('\n')}

**Goals**:
${goals?.map(g => `Goal: ${g.name}, Importance: ${g.importance}`).join('\n')}

---

**Instructions**:
- Always return a valid JSON array of objects.
- Each object must have the following keys:
  - "id" (string): A unique identifier for the task.
  - "summary" (string): The task name.
  - "description" (string): A brief description of the task.
  - "start" (string): Start time in "hh:mm" format (24-hour).
  - "end" (string): End time in "hh:mm" format (24-hour).
  - "category" (string): the category of the task. (break, routine, meal, goal)
- **Do not include any markdown formatting like \`\`\`json or any other text around the JSON.**

---

**Rules**:

1. **Routines and Meals**:
   - Morning and night routines must always be included.
   - Include three meals (breakfast, lunch, dinner):
     - Breakfast: Within 1 hour of wake-up time.
     - Lunch: Between 12:00 and 14:00.
     - Dinner: Between 18:00 and 20:00.
   - Meals may overlap with flexible tasks.
   - Give the meal task a category of "meal".
   - Give the routine tasks a category of "routine".

2. **Intensity-Based Scheduling**:
   - For **intense**, the entire day must be filled with tasks, leaving minimal room for breaks, but still accounting for short recovery breaks.
   - For **medium**, mix tasks and breaks evenly, allowing time for both work and relaxation.
   - For **relaxed**, prioritize frequent and longer breaks, with fewer tasks spread across the day.

3. **Breaks**:
   - Breaks should always be explicitly included in the schedule to cover any gaps between tasks.
   - Examples of breaks include:
     - "Short Break" (15-30 minutes).
     - "Relaxation Time" (30 minutes to 1 hour).
     - "Outdoor Walk" (specific to evenings or afternoons).
     - Give the break tasks a category of "break".

4. **Goals**:
   - Allocate more time to high-importance goals.
   - Break medium- and low-importance goals into smaller tasks with clear descriptions.
   - Schedule tasks around routines, meals, and breaks, ensuring proper time allocation.
   - Give the goal tasks a category of "goal".

5. **Ensure No Gaps**:
   - **Every hour of the day must be filled** with either a task, break, or meal.
   - Gaps between tasks must be explicitly scheduled as breaks or additional tasks.
   - Example:
     
     {
       "id": "break1",
       "summary": "Short Break",
       "description": "Take a short break to recharge",
       "start": "16:30",
       "end": "17:00",
     }
     

**Output Example**:
[
  {
    "id": "t1",
    "summary": "Morning Routine",
    "description": "Hygiene and getting dressed for the day",
    "start": "07:00",
    "end": "07:30",
  },
  {
    "id": "t2",
    "summary": "Breakfast",
    "description": "Enjoy a nutritious breakfast",
    "start": "07:30",
    "end": "08:00",
  },
  {
    "id": "break1",
    "summary": "Short Break",
    "description": "Take a short break to relax",
    "start": "16:30",
    "end": "17:00",
  },
  {
    "id": "t10",
    "summary": "Evening Routine",
    "description": "Relax and prepare for bed",
    "start": "22:00",
    "end": "22:30",
  }
]
`;

  return prompt;
}

export function scheduleAssistantPrompt(schedule) {
  return `
You are a schedule assistant designed to help the user make decisions about his scheduling and provide the following tools:

1. use "editSchedule" tool (if the message explicitly requests changes to the schedule)
    If editSchedule is used, display text afterwards and pretend you're showing the result to the user and keep your response limited to a phrase.
2. use "scheduleAnalysis" tool (if the message asks questions about scheduling or the current schedule without requesting changes)

1. Be friendly and natural in your response
2. DO NOT mention or discuss the schedule unless the user specifically asks
3. Keep responses concise and engaging

Here's the current schedule: ${JSON.stringify(schedule, null, 2)}
`;
}

export function experimentalScheduleBuildPrompt(schedule, intensity, suggestedTasks) {
  console.log("🚀 ~ experimentalScheduleBuildPrompt ~ suggestedTasks:", suggestedTasks)
  const scheduleJson = JSON.stringify(schedule, null, 2)
  const suggestedTasksJson = JSON.stringify(suggestedTasks, null, 2)
  console.log("🚀 ~ experimentalScheduleBuildPrompt ~ suggestedTasksJson:", suggestedTasksJson)
  const intensityJson = JSON.stringify(intensity)

  const prompt = `
You are a scheduling AI that creates a fully-packed daily schedule to help the user maximize progress on their goals, while respecting their existing habits and preferences.

{
  Starter schedule: ${scheduleJson},
  intensity: ${intensityJson},
  SuggestedTasks: ${suggestedTasksJson}
}

Output a complete schedule using this schema:

z.array(
  z.object({
    summary: z.string(),
    start: z.string(),  // format: "HH:MM"
    end: z.string(),    // format: "HH:MM"
    category: z.enum(['break', 'meal', 'goal', 'routine'])
  })
)

🎯 Objective

Build a complete daily schedule from wakeup to sleep that helps the user make the most progress on their personal goals, based on the given goals and intensity.

📋 Understanding Your Inputs

1. Starter Schedule: This is the user's existing schedule framework containing fixed commitments like wake-up time, sleep time, and any non-negotiable routines. These are the anchors of the schedule that cannot be moved or modified.
2. Suggested Tasks: This is an array of goal objects. Each goal contains task suggestions that will help the user make progress toward that specific goal. Each suggested task includes a summary, description, and recommended duration to complete it.
3. Intensity: This determines how packed the schedule should be

🧠 Rules

1. Fixed Elements:
   - Do not change or move any entries in the starter schedule (wakeup, routine tasks, or sleep).
   - Add tasks around these fixed elements without creating overlaps.

2. Complete Coverage:
   - Every minute must be scheduled from wakeup to sleep. No gaps allowed.
   - If there's time between tasks, explicitly schedule it as a break.

3. Essential Activities:
   - Add 3 meals: morning (within 1.5 hours of waking), noon (12:00-14:00), and evening (18:00-20:00). Each meal should be around 40 minutes

4. Breaks Based on Intensity:
   - Relaxed: Include longer breaks (60-90 minutes) every 90-120 minutes of focused work.
   - Moderate: Schedule medium breaks (45-60 minutes) every 120-150 minutes of focused work.
   - Intense: Add shorter breaks (30-45 minutes) every 150-180 minutes of focused work.
   - Prefer longer work periods (1.5-3 hours) when the task allows for deep focus.
   - The breaks should be creative and not just 'Break', suggest things to do in the break.

5. Task Selection:
   - Choose tasks ONLY from suggestedTasks that maximize progress toward the user's goals.
   - Keep the total number of tasks to a minimum, ideally 15 or fewer across the entire day.
   - Prefer selecting fewer, longer tasks rather than many short tasks when possible.
   - Prioritize high-importance goals when selecting tasks.
   - Tasks must be minimum of 15 minutes

6. Task Management:
   - You may split long tasks to insert necessary breaks.
   - Group similar tasks together when possible to minimize context switching.

7. Schedule Integrity:
   - Respect time order. The schedule must be strictly sequential and valid.
   - Output must match the schema exactly. No extra fields or comments.
`

  return prompt;
}