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
    console.log(`Attempting to load image from: ${src}`); // Debug log

    img.onload = () => {
      console.log(`Successfully loaded image: ${src}`);
      setLoading(false);
      setError(false);
    };
    img.onerror = (e) => {
      console.error(`Failed to load image: ${src}`, e);
      setLoading(false);
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loading, error };
};

const AILogo = ({ src, alt, className, ...props }: AILogoProps) => {
  const { loading, error } = useImageLoader(src);

  if (loading) {
    return (
      <div className="logo-container animate-pulse" aria-label="Loading logo">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
      </div>
    );
  }

  if (error) {
    console.warn(`Falling back to text for logo: ${src}`);
    return (
      <div className="logo-container" role="img" aria-label={alt}>
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-xs font-medium">
            {alt.split(' ')[0]}
          </span>
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
        loading="lazy"
        onError={(e) => {
          console.error(`Runtime error loading image: ${src}`, e);
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};

// Updated paths to use images directly from the root Images folder
export const GeminiLogo = (props: Omit<AILogoProps, 'src' | 'alt'>) => (
  <AILogo
    src="/gemini-logo.png"
    alt="Gemini AI Logo"
    {...props}
  />
);

export const OpenAILogo = (props: Omit<AILogoProps, 'src' | 'alt'>) => (
  <AILogo
    src="/chatgpt-logo.png"
    alt="ChatGPT Logo"
    {...props}
  />
);

export const ClaudeLogo = (props: Omit<AILogoProps, 'src' | 'alt'>) => (
  <AILogo
    src="/claude-logo.png"
    alt="Claude AI Logo"
    {...props}
  />
);