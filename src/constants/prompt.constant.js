

export function TaskSuggestionPrompt(goals) {
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
- Make a variety of task durations, short ones (15-45 minutes) and longer ones (45-120 minutes)

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

export function experimentalScheduleBuildPrompt(schedule, intensity, suggestedTasks) {
  const scheduleJson = JSON.stringify(schedule, null, 2)
  console.log("🚀 ~ experimentalScheduleBuildPrompt ~ scheduleJson:", scheduleJson)
  const suggestedTasks = JSON.stringify(suggestedTasks, null, 2)
  console.log("🚀 ~ experimentalScheduleBuildPrompt ~ goalsJson:", goalsJson)
  const intensityJson = JSON.stringify(intensity)

  const prompt = `
You are a scheduling AI that creates a fully-packed daily schedule to help the user make maximum progress on their goals, while respecting their existing habits and preferences.

Use the provided inputs (read-only):

{
  Suggested tasks: ${scheduleJson}, // contains fixed 'wakeup', routine blocks, and 'sleep' — DO NOT MODIFY these
  intensity: ${intensityJson}, // higher = more goal tasks, fewer/shorter breaks
  goals: ${goalsJson}
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

🧠 Rules

Do not change or move any entries in starterSchedule (wakeup, routine tasks, or sleep). Add tasks around them without overlap.

Every minute must be scheduled from wakeup to sleep. No gaps.

Add 3 meals: morning, noon, evening.

Insert breaks when needed. No single focus block (goal task) should exceed 1.5 hours without a break.

Distribute tasks smartly: choose tasks that maximize ROI toward the provided goals, adjusting quantity and duration based on the intensity level.

You may split long tasks to insert breaks.

Respect time order. The schedule must be strictly sequential and valid.

Output must match the schema exactly. No extra fields or comments.
`

  return prompt;
}