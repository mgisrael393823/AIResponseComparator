import { getImagePath } from "./utils";

// Define interface for AI profile structure
interface AIProfile {
  name: string;
  logo: string;
  fallbackText: string;
  alt: string;
  title: string;
}

export const aiProfiles: AIProfile[] = [
  {
    name: 'Gemini',
    logo: '/gemini-logo.png',  // Reference from public directory root
    fallbackText: 'G',
    alt: 'Gemini AI Logo',
    title: 'Start chatting with Gemini'
  },
  {
    name: 'ChatGPT',
    logo: '/chatgpt-logo.png',
    fallbackText: 'GPT',
    alt: 'ChatGPT Logo',
    title: 'Start chatting with ChatGPT'
  },
  {
    name: 'Claude',
    logo: '/claude-logo.png',
    fallbackText: 'C',
    alt: 'Claude AI Logo',
    title: 'Start chatting with Claude'
  }
];