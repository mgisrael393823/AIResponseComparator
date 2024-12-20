import { type ComponentProps, useState } from "react";
import { aiProfiles } from "@/lib/constants";

interface LogoComponentProps {
  logo: string;
  name: string;
  fallbackText: string;
  alt: string;
}

const LogoComponent = ({ logo, name, fallbackText, alt }: LogoComponentProps) => {
  const [error, setError] = useState(false);

  if (error) {
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
        className="ai-logo"
        loading="lazy"
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