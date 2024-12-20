import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
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
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
        className="min-h-[44px] max-h-[200px] resize-none bg-white border-gray-200 focus:border-gray-300 rounded-lg"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={!input.trim() || isLoading}
        className="h-[44px] w-[44px] shrink-0 bg-gray-900 hover:bg-gray-800"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default QueryInput;