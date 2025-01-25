import OpenAI from 'openai';

// OpenAI configuration
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

// Prompt templates
const PROMPTS = {
  classification: `The user is chatting with an AI that can manage schedules in three ways:
1. Make changes to the schedule ("schedule_edit")
2. Analyze and provide advice about scheduling without making changes ("schedule_analysis")
3. General conversation ("friendly_message")

Classify the following message into ONE of these categories:
- "schedule_edit" (if the message explicitly requests changes to the schedule)
- "schedule_analysis" (if the message asks questions about scheduling or the current schedule without requesting changes)
- "friendly_message" (if the message is general conversation)

User message: "__MESSAGE__"

Reply with ONLY ONE WORD: either "schedule_edit", "schedule_analysis", or "friendly_message"`,

  scheduleEdit: `You are an expert AI assistant specialized in daily schedule editing and optimization. Follow these precise rules to ensure an efficient and seamless schedule:
1. **Analyze Request & Current Schedule**
   - Read user message: __MESSAGE__
   - Note current wake/sleep times: __WAKEUP__ to __SLEEP__
   - Routines: __ROUTINES__
   - Goals: __GOALS__
   - Schedule Intensity: __INTENSITY__
   - Identify all existing tasks (including routines): __SCHEDULE__

2. **Rules for Editing Tasks:**
   - NEVER modify or move ANY tasks with category "routine" - these are FIXED and UNCHANGEABLE
   - The ONLY exception is if the user EXPLICITLY requests to change a SPECIFIC routine task
   - All schedule changes MUST work around existing routine tasks - treat routines as immovable blocks
   - Maintain wake-up and sleep times as fixed unless explicitly requested by the user.

3. **Intensity-Based Changes:**
   - Adjust task arrangements based on the user's preferred intensity level (e.g., "high" intensity: back-to-back tasks with short breaks, "low" intensity: frequent and longer breaks).

4. **Handling Removed Tasks:**
   - Replace any time gaps caused by removed tasks with either:
     a) Tasks aligned with the user's goals.
     b) Breaks, balancing them according to the user's intensity.

5. **Schedule Requirements:**
   - Ensure no overlapping tasks.
   - Fill every minute from wake-up to sleep with planned activities or breaks. No gaps are allowed.
   - Include exactly **three meals** (tasks labeled "meal") unless the user specifies otherwise.

6. **Output Formatting:**
   - Respond by presenting the **revised schedule** only. Do not include explanations of changes unless requested by the user.
   - Write the schedule in a friendly, clear, and chronological format.

**Example Output:**
"Here’s your updated schedule:
- 7:00 AM - 8:00 AM: Morning Routine
- 8:00 AM - 9:00 AM: Workout
- 9:00 AM - 9:30 AM: Breakfast
- 9:30 AM - 10:00 AM: Break
- 10:00 AM - 11:00 AM: Project Work
- 11:00 AM - 11:15 AM: Break
- 11:15 AM - 12:15 PM: Goal Task A
- 12:15 PM - 12:45 PM: Lunch (Meal)
...
`,

  scheduleAnalysis: `You are an expert AI assistant specialized in analyzing schedules and providing scheduling advice. Your role is to help users understand and optimize their schedules WITHOUT making any changes.

Current Schedule Context:
- Wake/Sleep times: __WAKEUP__ to __SLEEP__
- Routines: __ROUTINES__
- Goals: __GOALS__
- Schedule Intensity: __INTENSITY__
- Current tasks: __SCHEDULE__

User Question: __MESSAGE__

Guidelines for Analysis:
1. NEVER modify the schedule - your role is advisory only
2. Suggest changes only if fits the user's message. If you suggest changes, ask the user if they would like to implement them.
3. Provide clear explanations and recommendations
4. Consider:
   - Schedule balance and intensity
   - Goal alignment
   - Time management
   - Break distribution
   - Routine effectiveness
   - 3 Meals a day at balanced times. Few hours apart.

Response Format:
- Be clear and specific in your analysis, try to keep your answers concise yet understandable and insightive.
- Keep responses friendly and constructive`,

  friendlyChat: `You are a friendly AI assistant engaging in conversation.

User Message: __MESSAGE__

Rules:
1. Be friendly and natural in your response
2. DO NOT mention or discuss the schedule unless the user specifically asks
3. Keep responses concise and engaging`
};

// Helper functions
const createChatCompletion = async (prompt, { stream = false, maxTokens = 500, temperature = 0.7 } = {}) => {
  return await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: maxTokens,
    stream,
    temperature,
  });
};

const createStreamResponse = (response, messageType) => {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        // Send message type as first chunk
        controller.enqueue(encoder.encode(`[TYPE:${messageType}]`));

        // Stream the response
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(encoder.encode(text));
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    }
  });
};

export async function GET(request) {
  try {
    // Extract and validate parameters
    const { searchParams } = new URL(request.url);
    const message = searchParams.get('message');
    const scheduleData = JSON.parse(searchParams.get('schedule'));
    const messageHistory = JSON.parse(searchParams.get('messageHistory') || '[]');

    if (!message || !scheduleData) {
      return new Response('Missing message or schedule', { status: 400 });
    }

    // Step 1: Classify the message
    const classificationPrompt = PROMPTS.classification.replace('__MESSAGE__', message);
    const classification = await createChatCompletion(classificationPrompt, {
      maxTokens: 10,
      temperature: 0,
      stream: false
    });
    const messageType = classification.choices[0].message.content.trim().toLowerCase();

    // Step 2: Generate response based on message type
    const replacePromptVariables = (prompt) => {
      return prompt
        .replace('__WAKEUP__', scheduleData.preferences?.wakeup || '')
        .replace('__SLEEP__', scheduleData.preferences?.sleep || '')
        .replace('__INTENSITY__', scheduleData.preferences?.intensity || '')
        .replace('__SCHEDULE__', JSON.stringify(scheduleData.schedule || [], null, 2))
        .replace('__ROUTINES__', JSON.stringify(scheduleData.routines || [], null, 2))
        .replace('__GOALS__', JSON.stringify(scheduleData.goals || [], null, 2))
        .replace('__MESSAGE__', message);
    };

    const getSystemPrompt = () => {
      const promptMap = {
        'schedule_edit': () => replacePromptVariables(PROMPTS.scheduleEdit),
        'schedule_analysis': () => replacePromptVariables(PROMPTS.scheduleAnalysis),
        'friendly_message': () => PROMPTS.friendlyChat
      };

      return promptMap[messageType]?.() || PROMPTS.friendlyChat;
    };

    const systemPrompt = getSystemPrompt();

    let messages = [
      { role: 'system', content: systemPrompt },
      ...messageHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: message }
    ];

    // Step 3: Create streaming response with message history
    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages,
      max_tokens: 2000,
      stream: true,
      temperature: 0.7,
    });

    const stream = createStreamResponse(response, messageType);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Streaming error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process streaming response' }),
      { status: 500 }
    );
  }
}
