import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export default function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your question or message..."
        className="min-h-[100px] resize-none"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={!input.trim() || isLoading}
        className="w-full sm:w-auto"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Send <Send className="w-4 h-4" />
          </span>
        )}
      </Button>
    </form>
  );
}
