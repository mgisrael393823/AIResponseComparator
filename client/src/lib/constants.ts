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
    logo: '/public/gemini.png',  
    fallbackText: 'G',
    alt: 'Gemini AI Logo',
    title: 'Start chatting with Gemini'
  },
  {
    name: 'ChatGPT',
    logo: '/public/openai.png',
    fallbackText: 'GPT',
    alt: 'ChatGPT Logo',
    title: 'Start chatting with ChatGPT'
  },
  {
    name: 'Claude',
    logo: '/public/claude-color.png',
    fallbackText: 'C',
    alt: 'Claude AI Logo',
    title: 'Start chatting with Claude'
  }
];