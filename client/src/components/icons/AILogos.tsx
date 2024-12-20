import { type ComponentProps, useEffect, useState } from "react";

const useImageError = (src: string) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setError(false);
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setError(true);
    };
  }, [src]);

  return error;
};

export const GeminiLogo = ({ className, ...props }: ComponentProps<"div">) => {
  const hasError = useImageError("/gemini.png");
  console.log("Attempting to load Gemini logo from:", "/gemini.png");

  return (
    <div className={`ai-logo gemini-logo ${className}`} {...props}>
      {!hasError && (
        <img 
          src="/gemini.png" 
          alt="Gemini Logo"
          className="w-8 h-8 object-contain m-0 border-0" 
          onError={(e) => console.error("Gemini logo load error:", e)}
        />
      )}
    </div>
  );
};

export const OpenAILogo = ({ className, ...props }: ComponentProps<"div">) => {
  const hasError = useImageError("/openai.png");
  console.log("Attempting to load OpenAI logo from:", "/openai.png");

  return (
    <div className={`ai-logo gpt-logo ${className}`} {...props}>
      {!hasError && (
        <img 
          src="/openai.png" 
          alt="OpenAI Logo"
          className="w-9 h-9 object-contain m-0 border-0"
          onError={(e) => console.error("OpenAI logo load error:", e)}
        />
      )}
    </div>
  );
};

export const ClaudeLogo = ({ className, ...props }: ComponentProps<"div">) => {
  const hasError = useImageError("/claude-color.png");
  console.log("Attempting to load Claude logo from:", "/claude-color.png");

  return (
    <div className={`ai-logo claude-logo ${className}`} {...props}>
      {!hasError && (
        <img 
          src="/claude-color.png" 
          alt="Claude Logo"
          className="w-10 h-10 object-contain m-0 border-0"
          onError={(e) => console.error("Claude logo load error:", e)}
        />
      )}
    </div>
  );
};