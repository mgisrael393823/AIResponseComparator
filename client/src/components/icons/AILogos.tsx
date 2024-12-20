import { type ComponentProps } from "react";

export const GeminiLogo = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={className} {...props}>
    <img 
      src="/gemini.png" 
      alt="Gemini Logo"
      className="w-full h-full object-contain" 
    />
  </div>
);

export const OpenAILogo = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={className} {...props}>
    <img 
      src="/openai.png" 
      alt="OpenAI Logo"
      className="w-full h-full object-contain"
    />
  </div>
);

export const ClaudeLogo = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={className} {...props}>
    <img 
      src="/claude-color.png" 
      alt="Claude Logo"
      className="w-full h-full object-contain"
    />
  </div>
);