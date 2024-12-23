export interface AIResponse {
  openai: string | null;
  gemini: string | null;
  claude: string | null;
}

export async function compareResponses(query: string): Promise<AIResponse> {
  console.log('Starting API request with query:', query);

  try {
    const response = await fetch('/api/compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      credentials: 'include',
    });

    // Log raw response for debugging
    console.log('Raw response:', response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Processed API response:', data);
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}