import { useState, KeyboardEvent, useEffect } from "react";
import { Paperclip, ArrowUp } from "lucide-react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryInput = ({ onSubmit, isLoading }: QueryInputProps) => {
  const [input, setInput] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    onSubmit(input.trim());
    setInput("");
    setSelectedFile(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sticky bottom-0 px-4 py-3">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center gap-2 bg-[#f7f7f7] rounded-lg p-3"
      >
        {/* Text Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example text.|"
          className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
          disabled={isLoading}
        />

        {/* File Upload */}
        <label className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-colors">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          <Paperclip className="w-5 h-5 text-gray-500" />
        </label>

        {/* Selected File Name */}
        {selectedFile && (
          <div className="absolute -top-8 left-0 text-sm text-gray-600 bg-white px-2 py-1 rounded shadow-sm">
            {selectedFile.name}
          </div>
        )}
      </form>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 p-2 bg-black rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
};

export default QueryInput;