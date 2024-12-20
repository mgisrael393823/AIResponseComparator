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
      <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 bg-gray-50 p-4">
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            aria-label="Model selection"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
          >
            <Wand2 className="w-5 h-5" />
            <ChevronDown className="w-4 h-4" />
          </button>

          <button 
            type="button" 
            aria-label="Code block"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Code className="w-5 h-5" />
          </button>

          <button 
            type="button" 
            aria-label="Reply"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CornerUpRight className="w-5 h-5" />
          </button>

          <button 
            type="button" 
            aria-label="Refresh"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          <button 
            type="button" 
            aria-label="More options"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-4 py-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="min-h-[44px] max-h-[200px] resize-none border-0 focus:ring-0 p-2"
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="sync" 
              className="h-4 w-4"
              aria-label="Sync messages"
            />
            <label 
              htmlFor="sync" 
              className="text-sm text-gray-600"
            >
              Sync
            </label>
          </div>

          <button 
            type="button" 
            aria-label="Voice input"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryInput;