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
    logo: '/assets/gemini-logo.png',
    fallbackText: 'G',
    alt: 'Gemini AI Logo',
    title: 'Start chatting with Gemini'
  },
  {
    name: 'ChatGPT',
    logo: '/assets/chatgpt-logo.png',
    fallbackText: 'GPT',
    alt: 'ChatGPT Logo',
    title: 'Start chatting with ChatGPT'
  },
  {
    name: 'Claude',
    logo: '/assets/claude-logo.png',
    fallbackText: 'C',
    alt: 'Claude AI Logo',
    title: 'Start chatting with Claude'
  }
];