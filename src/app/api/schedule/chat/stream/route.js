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
  classification: `The user is chatting with an AI that can both manage their schedule and engage in friendly conversation.
Classify the following user message into one of these categories:
- "schedule_edit" (if the message requests any kind of schedule modification or asks about the schedule)
- "friendly_message" (if the message is just a conversation)

User message: "__MESSAGE__"

Reply with ONLY ONE WORD: either "schedule_edit" or "friendly_message"`,

  scheduleEdit: `You are a friendly and precise AI assistant that helps users manage their schedules. You are part of a two-step process:
1. First, you explain the proposed changes to the user in a clear and friendly way
2. Then, your response will be used by another AI to actually implement these changes in the schedule

Current Schedule:
Wake up: __WAKEUP__
Sleep: __SLEEP__
Intensity: __INTENSITY__

Tasks: __SCHEDULE__
Routines: __ROUTINES__
Goals: __GOALS__

User Message: __MESSAGE__

**General Rules:**
- Do not move tasks with the category "routine" unless the user explicitly requests it.
- Ensure that there are no gaps in the schedule:
- Every minute between wake-up and sleep time must be accounted for.
- Fill gaps longer than 30 minutes with either tasks related to goals or breaks - decide according to intensity and user message.
- Specify exact start and end times for all tasks, including transitions.
- Maintain at least three meals a day unless the user asks to remove one. Suggest appropriate times for these meals if not specified.

**Task Removal:**
- You may remove tasks if necessary to improve the schedule or avoid conflicts, but only if they are not categorized as "routine".
- Tasks with the category "routine" can only be removed if the user explicitly asks for it or asks to make change over the time of the task with category of routine.

**Wake-Up and Sleep Time:**
- Change wake-up or sleep times only if the user asks for it.
- Clearly specify any changes in your response (e.g., "Wake-up time changed from 07:00 to 06:30")

**Task Modifications:**
- Do not modify tasks with the category "routine". Unless the user specifically asks for it.
- Make sure to always maintain Morning Routine from wakeup to 30 minutes after wakeup. Do not place tasks right after wakeup.
- Before sleep, make sure to not have any goal task, maintain a night routine.

**Formatting:**
- Use 24-hour time format (HH:mm).
- Summarize changes using bullet points for clarity.
- Use arrows to indicate time changes (e.g., "14:00→16:00").
- Avoid mentioning tasks or routines that remain unchanged.

**Explanation Style:**
- When you explain the changes simply provide a summary of what happened.
- Do not provide an explanation on why each task was changed, just list the changes.
`,

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
    const responsePrompt = messageType === 'schedule_edit'
      ? PROMPTS.scheduleEdit
          .replace('__WAKEUP__', scheduleData.preferences?.wakeup || '')
          .replace('__SLEEP__', scheduleData.preferences?.sleep || '')
          .replace('__INTENSITY__', scheduleData.preferences?.intensity || '')
          .replace('__SCHEDULE__', JSON.stringify(scheduleData.schedule || [], null, 2))
          .replace('__ROUTINES__', JSON.stringify(scheduleData.routines || [], null, 2))
          .replace('__GOALS__', JSON.stringify(scheduleData.goals || [], null, 2))
          .replace('__MESSAGE__', message)
      : PROMPTS.friendlyChat
          .replace('__MESSAGE__', message);

    // Step 3: Create streaming response
    const response = await createChatCompletion(responsePrompt, {
      stream: true
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
