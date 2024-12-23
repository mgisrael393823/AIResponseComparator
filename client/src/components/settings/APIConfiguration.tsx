import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface APIConfigurationProps {
  onClose: () => void;
}

export function APIConfiguration({ onClose }: APIConfigurationProps) {
  const { toast } = useToast();
  const [keys, setKeys] = useState({
    openai: '',
    anthropic: '',
    gemini: ''
  });

  const handleSave = async () => {
    try {
      const response = await fetch('/api/config/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(keys),
      });

      if (!response.ok) {
        throw new Error('Failed to save API keys');
      }

      toast({
        title: "Success",
        description: "API keys updated successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API keys",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="openai">OpenAI API Key</Label>
          <Input
            id="openai"
            type="password"
            value={keys.openai}
            onChange={(e) => setKeys({ ...keys, openai: e.target.value })}
            placeholder="sk-..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="anthropic">Anthropic API Key</Label>
          <Input
            id="anthropic"
            type="password"
            value={keys.anthropic}
            onChange={(e) => setKeys({ ...keys, anthropic: e.target.value })}
            placeholder="sk-ant-..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gemini">Google Gemini API Key</Label>
          <Input
            id="gemini"
            type="password"
            value={keys.gemini}
            onChange={(e) => setKeys({ ...keys, gemini: e.target.value })}
            placeholder="AIza..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
