import Anthropic from '@anthropic-ai/sdk';

// Log API key presence (not the actual key)
console.log("Checking Claude API key configuration...");
if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY must be set in environment variables');
}

// Validate API key format and check for spaces
const apiKey = process.env.ANTHROPIC_API_KEY.trim();
console.log("API Key Length:", apiKey.length);

if (!apiKey.startsWith('sk-ant-')) {
  throw new Error('Invalid Anthropic API key format. It should start with "sk-ant-"');
}

// Initialize Anthropic client
let anthropic: Anthropic;
try {
  anthropic = new Anthropic({
    apiKey: apiKey,
  });
  console.log("Claude client initialized successfully");
} catch (error) {
  console.error('Failed to initialize Claude client:', error);
  throw new Error('Failed to initialize Claude client. Please check your API key configuration.');
}

export async function getClaudeResponse(query: string): Promise<string> {
  if (!query.trim()) {
    throw new Error('Query cannot be empty');
  }

  try {
    console.log('Sending request to Claude API...');
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: query }]
    });

    const response = message.content[0].text;
    if (!response) {
      throw new Error("No response generated from Claude");
    }

    console.log('Successfully received response from Claude');
    return response;

  } catch (error) {
    console.error("Claude API error details:", error);

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        throw new Error("Invalid Claude API key. Please check your API key configuration.");
      }
      if (error.message.includes('429')) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (error.message.includes('500')) {
        throw new Error("Claude service is currently experiencing issues. Please try again later.");
      }
      throw new Error(`Claude API error: ${error.message}`);
    }

    throw new Error("Failed to get response from Claude");
  }
}
