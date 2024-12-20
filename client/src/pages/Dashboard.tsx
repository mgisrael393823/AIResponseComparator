import { useState } from "react";
import { SiOpenai, SiGoogle } from "react-icons/si";
import { Dices, Settings, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import QueryInput from "@/components/QueryInput";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { AIResponse } from "@/lib/api";
import { useBreakpoint } from "@/hooks/useBreakpoint";

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
  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-lg font-semibold">Start chatting with {title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto min-h-0">
        <div className="text-sm text-gray-600 mb-6 bg-gray-50 rounded-lg p-4">
          <p className="font-medium mb-2">Model Instructions <span className="text-gray-400">(click to edit)</span></p>
          <p className="leading-relaxed">{MODEL_INSTRUCTIONS}</p>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : response ? (
          <div className="whitespace-pre-wrap">{response}</div>
        ) : null}
      </div>

      <div className="mt-auto">
        <QueryInput onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const { toast } = useToast();
  const breakpoint = useBreakpoint();

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

  const containerClasses = {
    mobile: "grid-cols-1",
    tablet: "grid-cols-2",
    desktop: "grid-cols-3",
  }[breakpoint];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-green-100">
      <div className="container mx-auto h-screen max-w-[1280px] p-4">
        <div className="relative bg-white rounded-xl shadow-lg h-full overflow-hidden">
          {/* macOS window controls */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {error && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <Card className="p-4 bg-destructive/10 text-destructive">
                {(error as Error).message}
              </Card>
            </div>
          )}

          <div className={`grid ${containerClasses} h-full divide-x divide-gray-200`}>
            <div className="h-full">
              <ChatPanel
                title="Gemini"
                icon={<SiGoogle className="w-6 h-6 text-green-600" />}
                accentColor="green"
                response={data?.gemini}
                isLoading={isLoading}
                onSubmit={handleSubmit}
              />
            </div>

            <div className="h-full">
              <ChatPanel
                title="OpenAI"
                icon={<SiOpenai className="w-6 h-6 text-blue-600" />}
                accentColor="blue"
                response={data?.openai}
                isLoading={isLoading}
                onSubmit={handleSubmit}
              />
            </div>

            <div className="h-full">
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
      </div>
    </div>
  );
}