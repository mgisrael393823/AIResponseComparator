import { useState, KeyboardEvent } from "react";
import { 
  ChevronDown, 
  Code, 
  CornerUpRight,
  RefreshCw, 
  MoreHorizontal,
  Mic,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryInput = ({ onSubmit, isLoading }: QueryInputProps) => {
  const [input, setInput] = useState("");
  const breakpoint = useBreakpoint();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      onSubmit(input.trim());
      setInput("");
    }
  };

  const containerClasses = {
    desktop: "p-6 gap-4",
    tablet: "p-4 gap-3",
    mobile: "p-3 gap-2",
  }[breakpoint];

  const iconSize = breakpoint === 'mobile' ? "w-4 h-4" : "w-5 h-5";
  const iconButtonClasses = `p-2.5 text-gray-500 hover:bg-gray-200/50 rounded-md transition-colors ${
    breakpoint === 'mobile' ? 'touch-manipulation' : ''
  }`;

  return (
    <div className="flex flex-col border-t border-gray-200">
      <form onSubmit={handleSubmit} className={`flex-1 flex items-center bg-gray-50 ${containerClasses}`}>
        {/* Left side icons */}
        <div className={`flex items-center gap-${breakpoint === 'mobile' ? '2' : '4'}`}>
          <button 
            type="button" 
            aria-label="Model selection"
            className={`${iconButtonClasses} flex items-center gap-1.5`}
          >
            <Wand2 className={iconSize} />
            <ChevronDown className={breakpoint === 'mobile' ? "w-3 h-3" : "w-4 h-4"} />
          </button>

          {breakpoint !== 'mobile' && (
            <>
              <button 
                type="button" 
                aria-label="Code block"
                className={iconButtonClasses}
              >
                <Code className={iconSize} />
              </button>

              <button 
                type="button" 
                aria-label="Reply"
                className={iconButtonClasses}
              >
                <CornerUpRight className={iconSize} />
              </button>

              <button 
                type="button" 
                aria-label="Refresh"
                className={iconButtonClasses}
              >
                <RefreshCw className={iconSize} />
              </button>

              <button 
                type="button" 
                aria-label="More options"
                className={iconButtonClasses}
              >
                <MoreHorizontal className={iconSize} />
              </button>
            </>
          )}
        </div>

        {/* Input field */}
        <div className="flex-1 flex items-center bg-white rounded-lg border border-gray-200 px-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className={`min-h-[${breakpoint === 'desktop' ? '64' : '56'}px] py-4 max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-${breakpoint === 'mobile' ? '[13px]' : 'sm'}`}
            disabled={isLoading}
          />
        </div>

        {/* Right side controls */}
        <div className={`flex items-center gap-${breakpoint === 'mobile' ? '4' : '6'}`}>
          {breakpoint !== 'mobile' && (
            <div className="flex items-center gap-2">
              <Checkbox 
                id="sync" 
                className="h-4 w-4"
                aria-label="Sync messages"
              />
              <label 
                htmlFor="sync" 
                className="text-sm text-gray-600 whitespace-nowrap"
              >
                Sync
              </label>
            </div>
          )}

          <button 
            type="button" 
            aria-label="Voice input"
            className={iconButtonClasses}
          >
            <Mic className={iconSize} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryInput;