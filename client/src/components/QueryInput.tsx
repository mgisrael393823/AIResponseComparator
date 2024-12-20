import { useState, KeyboardEvent } from "react";
import { Plus, Paperclip, Mic, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryInput = ({ onSubmit, isLoading }: QueryInputProps) => {
  const [input, setInput] = useState("");
  const [syncEnabled, setSyncEnabled] = useState(true);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    onSubmit(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-3 py-2"
    >
      <Plus className="w-5 h-5 text-gray-400" />

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message"
        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
        disabled={isLoading}
      />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="sync"
            checked={syncEnabled}
            onCheckedChange={(checked) => setSyncEnabled(checked as boolean)}
          />
          <label htmlFor="sync" className="text-sm text-gray-600">
            Sync
          </label>
        </div>
        <Mic className="w-5 h-5 text-gray-400" />
      </div>
    </form>
  );
};

export default QueryInput;