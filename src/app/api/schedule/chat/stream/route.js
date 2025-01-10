import OpenAI from 'openai';

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Prompt templates
const PROMPTS = {
  classification: `The user is chatting with an AI that can both manage their schedule and engage in friendly conversation.
Classify the following user message into one of these categories:
- "schedule_edit" (if the message requests any kind of schedule modification or asks about the schedule)
- "friendly_message" (if the message is just a conversation)

User message: "__MESSAGE__"

Reply with ONLY ONE WORD: either "schedule_edit" or "friendly_message"`,

  scheduleEdit: `You are a friendly AI assistant that helps users manage their schedules. You are part of a two-step process:
1. First, you explain the proposed changes to the user in a clear and friendly way
2. Then, your response will be used by another AI to actually implement these changes in the schedule

Current Schedule Details:
Wake up: __WAKEUP__
Sleep: __SLEEP__
Intensity: __INTENSITY__

Tasks:
__SCHEDULE__

Routines:
__ROUTINES__

Goals:
__GOALS__

User Message: __MESSAGE__

**Instructions:**
1. Do not move task with category of routine unless the user asked you to, keep them in the same place.
2. Change wake up and sleep time only if the user asked you to and specify it in the response if changed.
3. Be very specific about time changes so the implementation AI can understand them (e.g., "Move the workout from 14:00 to 16:00").
4. Fill ALL gaps in the schedule:
   - Every minute between wake up and sleep time must be accounted for
   - If there's a gap longer than 30 minutes, suggest productive activities (e.g., "Quick email check", "Light stretching")
   - Specify exact start and end times for all activities, including transitions

**Rules:**
1. If the user requests specific changes:
   - When changing wake up or sleep time, always specify the exact change in your response (e.g., "I'll change your wake up time from 8:00 to 9:00")
   - Clearly list what tasks will be changed with their exact times
   - Explain why these changes make sense

2. If you identify improvements the user hasn't requested:
   Provide a clear, concise explanation:
   - What specific tasks could be moved/modified (with exact times)
   - Why these changes would improve the schedule
   - How this affects the overall flow of the day

3. Always be friendly but direct in your responses
4. Format times in 24-hour format (HH:mm) to ensure accurate implementation

Keep your response focused and to-the-point, as it will be used both for user communication and schedule modification.`,

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
    model: 'gpt-4o-2024-08-06',
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
