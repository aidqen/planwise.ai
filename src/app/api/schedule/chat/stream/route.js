import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request) {
  try {
    const { message, schedule } = await request.json();

    const summaryPrompt = `You are an AI assistant that helps modify daily schedules. A user has requested changes to their schedule.

Current Schedule:
${JSON.stringify(schedule, null, 2)}

User Request: ${message}

Provide a clear, concise explanation of what changes you would make to the schedule and why. 
Keep it natural and conversational, but specific about the changes.
Focus on explaining:
1. What specific tasks will be moved/modified
2. Why these changes make sense
3. How this affects the overall flow of the day

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
