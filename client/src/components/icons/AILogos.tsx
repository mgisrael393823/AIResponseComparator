import { type ComponentProps } from "react";

export const GeminiLogo = ({ className, ...props }: ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      fill="url(#gemini-gradient)"
      stroke="currentColor"
      strokeWidth="0.5"
    />
    <defs>
      <linearGradient id="gemini-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A73E8" />
        <stop offset="1" stopColor="#8AB4F8" />
      </linearGradient>
    </defs>
  </svg>
);

export const OpenAILogo = ({ className, ...props }: ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM17.5 12C17.5 15.038 15.038 17.5 12 17.5C8.962 17.5 6.5 15.038 6.5 12C6.5 8.962 8.962 6.5 12 6.5C15.038 6.5 17.5 8.962 17.5 12Z"
    />
  </svg>
);

export const ClaudeLogo = ({ className, ...props }: ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 3L4.5 7.5V16.5L12 21L19.5 16.5V7.5L12 3Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
);
