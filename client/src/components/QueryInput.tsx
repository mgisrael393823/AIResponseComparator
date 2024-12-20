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

  const iconButtonClasses = `
    p-2 text-gray-500
    hover:bg-gray-100 hover:-translate-y-0.5
    active:translate-y-0 active:bg-gray-200
    focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2
    rounded-md transition-all duration-200
    cursor-pointer relative
    flex items-center justify-center
    ${breakpoint === 'mobile' ? 'touch-manipulation min-h-[44px] min-w-[44px]' : ''}
  `.trim();

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
              className={`${iconButtonClasses} group`}
              role="button"
              tabIndex={0}
            >
              <Wand2 className="w-5 h-5" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Select model
              </span>
            </button>

            {breakpoint !== 'mobile' && (
              <>
                <button 
                  type="button"
                  aria-label="Code block"
                  className={`${iconButtonClasses} group`}
                  role="button"
                  tabIndex={0}
                >
                  <Code className="w-5 h-5" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Insert code block
                  </span>
                </button>

                <button 
                  type="button"
                  aria-label="Reply"
                  className={`${iconButtonClasses} group`}
                  role="button"
                  tabIndex={0}
                >
                  <CornerUpRight className="w-5 h-5" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Reply to message
                  </span>
                </button>

                <button 
                  type="button"
                  aria-label="Refresh"
                  className={`${iconButtonClasses} group`}
                  role="button"
                  tabIndex={0}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Refresh response
                  </span>
                </button>

                <button 
                  type="button"
                  aria-label="More options"
                  className={`${iconButtonClasses} group`}
                  role="button"
                  tabIndex={0}
                >
                  <MoreHorizontal className="w-5 h-5" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    More options
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {breakpoint !== 'mobile' && (
              <div className="flex items-center gap-2 group px-2 py-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                <Checkbox 
                  id="sync"
                  className="h-4 w-4 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  aria-label="Sync messages"
                />
                <label 
                  htmlFor="sync"
                  className="text-sm text-gray-600 whitespace-nowrap select-none"
                >
                  Sync
                </label>
              </div>
            )}

            <button 
              type="button"
              aria-label="Voice input"
              className={`${iconButtonClasses} group`}
              role="button"
              tabIndex={0}
            >
              <Mic className="w-5 h-5" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Voice input
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryInput;