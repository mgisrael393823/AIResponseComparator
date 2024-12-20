import { type ComponentProps, useState, useEffect } from "react";
import { aiProfiles } from "@/lib/constants";

interface LogoComponentProps {
  logo: string;
  name: string;
  fallbackText: string;
  alt: string;
}

const LogoComponent = ({ logo, name, fallbackText, alt }: LogoComponentProps) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Reset states when logo path changes
    setError(false);
    setLoaded(false);
  }, [logo]);

  if (error) {
    console.log(`Using fallback for ${name} logo`);
    return (
      <div 
        className="logo-fallback" 
        role="img" 
        aria-label={alt}
        data-ai={name.toLowerCase()}
      >
        <span>{fallbackText}</span>
      </div>
    );
  }

  return (
    <div className="logo-container">
      <img
        src={logo}
        alt={alt}
        className={`ai-logo ${!loaded ? 'opacity-0' : 'opacity-100'}`}
        loading="eager"
        onLoad={() => {
          console.log(`Successfully loaded ${name} logo`);
          setLoaded(true);
        }}
        onError={(e) => {
          console.error(`Failed to load logo for ${name}:`, e);
          setError(true);
        }}
      />
    </div>
  );
};

export const GeminiLogo = (props: Omit<ComponentProps<"div">, "children">) => (
  <LogoComponent {...aiProfiles[0]} {...props} />
);

export const OpenAILogo = (props: Omit<ComponentProps<"div">, "children">) => (
  <LogoComponent {...aiProfiles[1]} {...props} />
);

export const ClaudeLogo = (props: Omit<ComponentProps<"div">, "children">) => (
  <LogoComponent {...aiProfiles[2]} {...props} />
);