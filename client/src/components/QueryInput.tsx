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

  const iconButtonClasses = `p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors ${
    breakpoint === 'mobile' ? 'touch-manipulation' : ''
  }`;

  return (
    <div className="sticky bottom-0 mx-4 mb-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Message Input Section */}
        <div className="p-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="w-full h-[56px] py-4 px-4 resize-none border-0 focus:ring-0 focus:border-0 text-gray-600 text-sm bg-white"
            disabled={isLoading}
          />
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-gray-200" />

        {/* Icons and Controls Section */}
        <div className="h-[44px] px-4 flex items-center justify-between bg-white">
          {/* Left side icons */}
          <div className="flex items-center gap-2">
            <button 
              type="button"
              aria-label="Model selection"
              className={iconButtonClasses}
            >
              <Wand2 className="w-5 h-5" />
            </button>

            {breakpoint !== 'mobile' && (
              <>
                <button 
                  type="button"
                  aria-label="Code block"
                  className={iconButtonClasses}
                >
                  <Code className="w-5 h-5" />
                </button>

                <button 
                  type="button"
                  aria-label="Reply"
                  className={iconButtonClasses}
                >
                  <CornerUpRight className="w-5 h-5" />
                </button>

                <button 
                  type="button"
                  aria-label="Refresh"
                  className={iconButtonClasses}
                >
                  <RefreshCw className="w-5 h-5" />
                </button>

                <button 
                  type="button"
                  aria-label="More options"
                  className={iconButtonClasses}
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
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
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryInput;