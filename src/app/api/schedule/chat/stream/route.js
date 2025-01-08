import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request) {
  try {
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const message = searchParams.get('message');
    const schedule = JSON.parse(searchParams.get('schedule'));

    if (!message || !schedule) {
      return new Response('Missing message or schedule', { status: 400 });
    }

    const summaryPrompt = `You are a friendly and helpful AI assistant that helps users manage their schedules.

Current Schedule:
${JSON.stringify(schedule, null, 2)}

User Message: ${message}

Rules:
1. If the user is just greeting or chatting, respond naturally without mentioning the schedule

2. If the user requests specific changes:
   - Briefly list what tasks will be changed
   - Make the changes directly

3. If you identify improvements the user hasn't requested:
   Provide a clear, concise explanation:
   - What specific tasks will be moved/modified
   - Why these changes make sense
   - How this affects the overall flow of the day

4. Always be friendly but direct in your responses

DO NOT make the actual changes yet, just explain what you would change.
Keep your response focused and to-the-point.`;

    // Create a streaming response
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [{ role: 'user', content: summaryPrompt }],
      max_tokens: 500,
      stream: true,
      temperature: 0.7,
    });

    // Create a readable stream with proper encoding
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || '';
            const encoded = encoder.encode(text);
            controller.enqueue(encoded);
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      }
    });

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
