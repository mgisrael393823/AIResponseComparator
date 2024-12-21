import { type ComponentProps, useState, useEffect } from "react";
import { aiProfiles } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

interface LogoComponentProps {
  logo: string;
  name: string;
  fallbackText: string;
  alt: string;
}

const LogoComponent = ({ logo, name, fallbackText, alt }: LogoComponentProps) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset states when logo path changes
    setError(false);
    setLoaded(false);

    // Preload image
    const img = new Image();
    img.src = logo;

    img.onload = () => {
      setLoaded(true);
    };

    img.onerror = () => {
      setError(true);
      toast({
        title: "Image Load Error",
        description: `Failed to load ${name} logo`,
        variant: "destructive",
      });
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [logo, name, toast]);

  if (error) {
    return (
      <div 
        className="logo-fallback" 
        role="img" 
        aria-label={alt}
        data-ai={name.toLowerCase()}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <div className="logo-container">
      <img
        src={logo}
        alt={alt}
        className={`ai-logo ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
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