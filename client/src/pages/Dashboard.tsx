import { useState } from "react";
import { SiOpenai, SiGoogle } from "react-icons/si";
import { Dices, Settings, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import QueryInput from "@/components/QueryInput";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { compareResponses } from "@/lib/api";
import type { AIResponse } from "@/lib/api";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface ChatPanelProps {
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  response?: string;
  isLoading: boolean;
  onSubmit: (input: string) => void;
}

const ChatPanel = ({ title, icon, accentColor, response, isLoading, onSubmit }: ChatPanelProps) => {
  const breakpoint = useBreakpoint();

  const headerClasses = {
    desktop: "text-lg px-6 py-4",
    tablet: "text-base px-4 py-3",
    mobile: "text-base px-3 py-3",
  }[breakpoint];

  const contentClasses = {
    desktop: "p-6 gap-6",
    tablet: "p-4 gap-4",
    mobile: "p-3 gap-3",
  }[breakpoint];

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className={`flex items-center justify-between border-b ${headerClasses}`}>
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="font-semibold">Start chatting with {title}</h2>
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

      <div className={`flex-1 overflow-y-auto min-h-0 ${contentClasses}`}>
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : response ? (
          <div className="whitespace-pre-wrap text-[13px] md:text-sm">{response}</div>
        ) : null}
      </div>

      <div className="mt-auto">
        <QueryInput onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { toast } = useToast();
  const breakpoint = useBreakpoint();

  const mutation = useMutation({
    mutationFn: compareResponses,
    onError: (error) => {
      console.error('API Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get AI responses",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = async (input: string) => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    console.log('Submitting query:', input);
    try {
      await mutation.mutateAsync(input);
    } catch (err) {
      console.error('Mutation error:', err);
    }
  };

  const containerClasses = {
    mobile: "grid-cols-1 p-3",
    tablet: "grid-cols-2 p-4",
    desktop: "grid-cols-3 p-6",
  }[breakpoint];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-green-100">
      <div className="container mx-auto h-[calc(100vh-48px)] max-w-[1280px] px-3 py-6 md:p-4 lg:p-6">
        <div className="relative bg-white rounded-xl shadow-lg h-full overflow-hidden">
          {/* macOS window controls */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {mutation.error && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <Card className="p-4 bg-destructive/10 text-destructive">
                {(mutation.error as Error).message}
              </Card>
            </div>
          )}

          <div className={`grid ${containerClasses} h-full divide-x divide-gray-200 transition-all duration-300`}>
            <div className="h-full">
              <ChatPanel
                title="Gemini"
                icon={<SiGoogle className="w-6 h-6 text-green-600" />}
                accentColor="green"
                response={mutation.data?.gemini}
                isLoading={mutation.isPending}
                onSubmit={handleSubmit}
              />
            </div>

            <div className="h-full">
              <ChatPanel
                title="OpenAI"
                icon={<SiOpenai className="w-6 h-6 text-blue-600" />}
                accentColor="blue"
                response={mutation.data?.openai}
                isLoading={mutation.isPending}
                onSubmit={handleSubmit}
              />
            </div>

            <div className="h-full">
              <ChatPanel
                title="Claude"
                icon={<Dices className="w-6 h-6 text-purple-600" />}
                accentColor="purple"
                response={mutation.data?.claude}
                isLoading={mutation.isPending}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}