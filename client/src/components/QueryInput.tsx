import { useState, KeyboardEvent } from "react";
import { Send, RefreshCw, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="flex items-center gap-2">
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
        <RefreshCw className="w-5 h-5" />
      </button>

      <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className="min-h-[44px] max-h-[200px] resize-none border-0 focus:ring-0 p-2 bg-gray-100"
          disabled={isLoading}
        />

        <div className="flex items-center gap-2">
          <button type="button" className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <Button 
            type="submit" 
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-8 w-8 rounded-full bg-transparent hover:bg-gray-100 transition-colors"
          >
            <Send className="h-4 w-4 text-gray-700" />
          </Button>
        </div>
      </form>

      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
        <RefreshCw className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QueryInput;