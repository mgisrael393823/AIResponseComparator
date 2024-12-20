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

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryInput = ({ onSubmit, isLoading }: QueryInputProps) => {
  const [input, setInput] = useState("");

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

  return (
    <div className="flex flex-col border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-4 bg-gray-50 p-6">
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            aria-label="Model selection"
            className="p-2.5 text-gray-500 hover:bg-gray-200/50 rounded-md transition-colors flex items-center gap-1.5"
          >
            <Wand2 className="w-5 h-5" />
            <ChevronDown className="w-4 h-4" />
          </button>

          <button 
            type="button" 
            aria-label="Code block"
            className="p-2.5 text-gray-500 hover:bg-gray-200/50 rounded-md transition-colors"
          >
            <Code className="w-5 h-5" />
          </button>

          <button 
            type="button" 
            aria-label="Reply"
            className="p-2.5 text-gray-500 hover:bg-gray-200/50 rounded-md transition-colors"
          >
            <CornerUpRight className="w-5 h-5" />
          </button>

          <button 
            type="button" 
            aria-label="Refresh"
            className="p-2.5 text-gray-500 hover:bg-gray-200/50 rounded-md transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          <button 
            type="button" 
            aria-label="More options"
            className="p-2.5 text-gray-500 hover:bg-gray-200/50 rounded-md transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex items-center bg-white rounded-lg border border-gray-200 px-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="min-h-[56px] py-4 max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-6">
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

          <button 
            type="button" 
            aria-label="Voice input"
            className="p-2.5 text-gray-500 hover:bg-gray-200/50 rounded-md transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryInput;