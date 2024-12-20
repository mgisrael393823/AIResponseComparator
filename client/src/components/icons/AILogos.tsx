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
      <div className="logo-container" role="img" aria-label={alt}>
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-xs font-medium">
            {fallbackText}
          </span>
        </div>
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
        onError={() => {
          console.error(`Failed to load logo for ${name}`);
          setError(true);
        }}
      />
    </div>
  );
};

// Simplified logo components using the new LogoComponent
export const GeminiLogo = (props: Omit<ComponentProps<"div">, "children">) => (
  <LogoComponent {...aiProfiles[0]} {...props} />
);

export const OpenAILogo = (props: Omit<ComponentProps<"div">, "children">) => (
  <LogoComponent {...aiProfiles[1]} {...props} />
);

export const ClaudeLogo = (props: Omit<ComponentProps<"div">, "children">) => (
  <LogoComponent {...aiProfiles[2]} {...props} />
);