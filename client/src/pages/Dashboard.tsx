import { useState } from "react";
import { SiOpenai, SiGoogle } from "react-icons/si";
import { Dices, Settings, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import QueryInput from "@/components/QueryInput";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { AIResponse } from "@/lib/api";

const MODEL_INSTRUCTIONS = `I want you to act as a rival chess player. We will say our moves in reciprocal order. In the beginning, I will be white. Also, please don't explain your moves to me because we are rivals. After my first message, I will just write my move. Don't forget to update the state of the board in your mind as we make moves.`;

interface ChatPanelProps {
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  response?: string;
  isLoading: boolean;
  onSubmit: (input: string) => void;
}

const ChatPanel = ({ title, icon, accentColor, response, isLoading, onSubmit }: ChatPanelProps) => {
  const colorClasses = {
    blue: "border-blue-500/20 hover:border-blue-500/30",
    purple: "border-purple-500/20 hover:border-purple-500/30",
    green: "border-green-500/20 hover:border-green-500/30",
  }[accentColor] || "border-gray-200";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold">Start chatting with {title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="text-sm text-gray-600 mb-4">
          <p className="font-medium mb-1">Model Instructions:</p>
          <p>{MODEL_INSTRUCTIONS}</p>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : response ? (
          <div className="whitespace-pre-wrap">{response}</div>
        ) : null}
      </div>

      <div className="p-4 border-t">
        <QueryInput onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery<AIResponse>({
    queryKey: ['/api/compare', query],
    queryFn: async () => {
      if (!query) return null;
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error('Failed to fetch responses');
      return res.json();
    },
    enabled: false,
  });

  const handleSubmit = async (input: string) => {
    setQuery(input);
    try {
      await refetch();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch AI responses",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <Card className="p-4 bg-destructive/10 text-destructive">
              {(error as Error).message}
            </Card>
          </div>
        )}

        <div className="flex-1 border-r">
          <ChatPanel
            title="Gemini"
            icon={<SiGoogle className="w-6 h-6 text-green-600" />}
            accentColor="green"
            response={data?.gemini}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="flex-1 border-r">
          <ChatPanel
            title="OpenAI"
            icon={<SiOpenai className="w-6 h-6 text-blue-600" />}
            accentColor="blue"
            response={data?.openai}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="flex-1">
          <ChatPanel
            title="Claude"
            icon={<Dices className="w-6 h-6 text-purple-600" />}
            accentColor="purple"
            response={data?.claude}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}