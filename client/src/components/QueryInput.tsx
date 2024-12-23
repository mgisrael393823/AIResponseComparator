import { useState, KeyboardEvent } from "react";
import { Plus, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "./FileUpload";
import { useToast } from "@/hooks/use-toast";

interface QueryInputProps {
  onSubmit: (query: string, files?: File[]) => void;
  isLoading: boolean;
  className?: string;
}

const QueryInput = ({ onSubmit, isLoading, className }: QueryInputProps) => {
  const [input, setInput] = useState("");
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    try {
      onSubmit(input.trim(), attachedFiles);
      setInput("");
      setAttachedFiles([]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setAttachedFiles(prev => [...prev, ...files]);
      setShowUpload(false);
      toast({
        title: "Files attached",
        description: `${files.length} file(s) ready to be sent`,
      });
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(files => files.filter((_, i) => i !== index));
    toast({
      title: "File removed",
      description: "Attachment removed successfully",
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {showUpload && (
        <div className="rounded-lg border border-border bg-background p-4">
          <FileUpload
            onUpload={handleFileUpload}
            accept=".pdf,.doc,.docx,.txt"
            multiple={true}
          />
        </div>
      )}

      <form 
        onSubmit={handleSubmit}
        className="flex items-start gap-3 bg-background rounded-lg border border-border p-3"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 mt-1"
          onClick={() => setShowUpload(!showUpload)}
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={attachedFiles.length ? `${attachedFiles.length} file(s) attached` : "Type your message..."}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground min-h-[80px] resize-none py-1"
          disabled={isLoading}
        />

        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-2">
            <Checkbox
              id="sync"
              checked={syncEnabled}
              onCheckedChange={(checked) => setSyncEnabled(checked as boolean)}
            />
            <label htmlFor="sync" className="text-sm text-muted-foreground">
              Sync
            </label>
          </div>
          <Button type="submit" disabled={isLoading} variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachedFiles.map((file, index) => (
            <div 
              key={index}
              className="text-xs bg-muted px-2 py-1 rounded-full flex items-center gap-1"
            >
              <span className="text-muted-foreground">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Remove file"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryInput;