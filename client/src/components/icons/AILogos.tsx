import { type ComponentProps, useEffect, useState } from "react";

interface AILogoProps extends ComponentProps<"div"> {
  src: string;
  alt: string;
}

const useImageLoader = (src: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoading(false);
      setError(false);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setLoading(false);
      setError(true);
    };
  }, [src]);

  return { loading, error };
};

const AILogo = ({ src, alt, className, ...props }: AILogoProps) => {
  const { loading, error } = useImageLoader(src);

  if (loading) {
    return (
      <div className="logo-container animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
      </div>
    );
  }

  if (error) {
    console.warn(`Failed to load logo: ${src}`);
    return (
      <div className="logo-container">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-xs">{alt.split(' ')[0]}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="logo-container" {...props}>
      <img 
        src={src}
        alt={alt}
        className="ai-logo"
      />
    </div>
  );
};

export const GeminiLogo = (props: Omit<AILogoProps, 'src' | 'alt'>) => (
  <AILogo
    src="/assets/gemini-logo.png"
    alt="Gemini AI Logo"
    {...props}
  />
);

export const OpenAILogo = (props: Omit<AILogoProps, 'src' | 'alt'>) => (
  <AILogo
    src="/assets/chatgpt-logo.png"
    alt="ChatGPT Logo"
    {...props}
  />
);

export const ClaudeLogo = (props: Omit<AILogoProps, 'src' | 'alt'>) => (
  <AILogo
    src="/assets/claude-logo.png"
    alt="Claude AI Logo"
    {...props}
  />
);