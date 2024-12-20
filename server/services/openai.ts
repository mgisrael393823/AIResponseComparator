import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY must be set in environment variables');
}

// Validate API key format
const apiKey = process.env.OPENAI_API_KEY.trim();
if (!apiKey.startsWith('sk-')) {
  throw new Error('Invalid OpenAI API key format. It should start with "sk-" or "sk-proj-"');
}

// Initialize OpenAI client
let openai: OpenAI;
try {
  openai = new OpenAI({
    apiKey: apiKey,
  });
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error);
  throw new Error('Failed to initialize OpenAI client. Please check your API key configuration.');
}

export async function getOpenAIResponse(query: string): Promise<string> {
  if (!query.trim()) {
    throw new Error('Query cannot be empty');
  }

  try {
    console.log('Sending request to OpenAI API...');
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response generated from OpenAI");
    }

    console.log('Successfully received response from OpenAI');
    return response;

  } catch (error) {
    console.error("OpenAI API error details:", error);

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        throw new Error("Invalid OpenAI API key. Please check your API key configuration.");
      }
      if (error.message.includes('429')) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (error.message.includes('500')) {
        throw new Error("OpenAI service is currently experiencing issues. Please try again later.");
      }
      throw new Error(`OpenAI API error: ${error.message}`);
    }

    throw new Error("Failed to get response from OpenAI");
  }
}