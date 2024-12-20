import { type ComponentProps } from "react";

export const GeminiLogo = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={`ai-logo gemini-logo ${className}`} {...props}>
    <img 
      src="/gemini.png" 
      alt="Gemini Logo"
      className="w-8 h-8 object-contain m-0 border-0" 
    />
  </div>
);

export const OpenAILogo = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={`ai-logo gpt-logo ${className}`} {...props}>
    <img 
      src="/openai.png" 
      alt="OpenAI Logo"
      className="w-9 h-9 object-contain m-0 border-0"
    />
  </div>
);

export const ClaudeLogo = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={`ai-logo claude-logo ${className}`} {...props}>
    <img 
      src="/claude-color.png" 
      alt="Claude Logo"
      className="w-10 h-10 object-contain m-0 border-0"
    />
  </div>
);