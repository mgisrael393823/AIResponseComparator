import { GoogleGenerativeAI } from '@google/generative-ai';

// Log API key presence (not the actual key)
console.log("Checking Gemini API key configuration...");
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY must be set in environment variables');
}

// Validate API key format and check for spaces
const apiKey = process.env.GEMINI_API_KEY.trim();
console.log("API Key Length:", apiKey.length);

// Initialize Gemini client
let genAI: GoogleGenerativeAI;
try {
  genAI = new GoogleGenerativeAI(apiKey);
  console.log("Gemini client initialized successfully");
} catch (error) {
  console.error('Failed to initialize Gemini client:', error);
  throw new Error('Failed to initialize Gemini client. Please check your API key configuration.');
}

export async function getGeminiResponse(query: string): Promise<string> {
  if (!query.trim()) {
    throw new Error('Query cannot be empty');
  }

  try {
    console.log('Sending request to Gemini API...');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("No response generated from Gemini");
    }

    console.log('Successfully received response from Gemini');
    return text;

  } catch (error) {
    console.error("Gemini API error details:", error);

    // Handle specific error cases
    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();

      if (errorMsg.includes('quota') || errorMsg.includes('rate limit')) {
        return "Gemini API is currently unavailable (quota exceeded). Using fallback response instead.";
      }
      if (errorMsg.includes('unauthorized') || errorMsg.includes('invalid key')) {
        throw new Error("Invalid Gemini API key. Please check your API key configuration.");
      }
      if (errorMsg.includes('timeout')) {
        throw new Error("Request timed out. Please try again later.");
      }
      throw new Error(`Gemini API error: ${error.message}`);
    }

    throw new Error("Failed to get response from Gemini");
  }
}
