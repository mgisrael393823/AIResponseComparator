export interface AIResponse {
  openai?: string;
  perplexity?: string;
  claude?: string;
}

export async function compareResponses(query: string): Promise<AIResponse> {
  const response = await fetch('/api/compare', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to get AI responses');
  }

  return response.json();
}