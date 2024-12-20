import { useState } from "react";
import { SiOpenai, SiGoogle } from "react-icons/si";
import { Dices, Settings, Plus, Mic, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import QueryInput from "@/components/QueryInput";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { compareResponses } from "@/lib/api";
import type { AIResponse } from "@/lib/api";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const AIHeader = ({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) => (
  <div className="flex flex-col items-center justify-center p-4 border-b border-gray-200">
    <div className="mb-2">{icon}</div>
    <h2 className="text-sm font-medium text-gray-700">{title}</h2>
  </div>
);

const ResponseSection = ({ response, isLoading }: { response?: string; isLoading: boolean }) => (
  <div className="p-4">
    {isLoading ? (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    ) : response ? (
      <div className="whitespace-pre-wrap text-sm">{response}</div>
    ) : null}
  </div>
);

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
    mobile: "grid-cols-1",
    tablet: "grid-cols-2",
    desktop: "grid-cols-3",
  }[breakpoint];

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-gray-200">
        <span className="text-sm font-medium">New Chat</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Add Split Chat</span>
          <Settings className="w-5 h-5 text-gray-600" />
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 grid ${containerClasses} divide-x divide-gray-200 overflow-hidden`}>
        {/* Gemini Section */}
        <div className="flex flex-col h-full">
          <AIHeader
            icon={<SiGoogle className="w-8 h-8 text-[#0066FF]" />}
            title="Start chatting with Gemini"
            color="blue"
          />
          <ResponseSection
            response={mutation.data?.gemini}
            isLoading={mutation.isPending}
          />
        </div>

        {/* OpenAI Section */}
        <div className="flex flex-col h-full">
          <AIHeader
            icon={<SiOpenai className="w-8 h-8 text-[#19C37D]" />}
            title="Start chatting with ChatGPT"
            color="green"
          />
          <ResponseSection
            response={mutation.data?.openai}
            isLoading={mutation.isPending}
          />
        </div>

        {/* Claude Section */}
        <div className="flex flex-col h-full">
          <AIHeader
            icon={<Dices className="w-8 h-8 text-[#6B4BCE]" />}
            title="Start chatting with Claude"
            color="purple"
          />
          <ResponseSection
            response={mutation.data?.claude}
            isLoading={mutation.isPending}
          />
        </div>
      </main>

      {/* Footer Input */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <QueryInput onSubmit={handleSubmit} isLoading={mutation.isPending} />
        </div>
      </footer>

      {mutation.error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2">
          <Card className="p-4 bg-destructive/10 text-destructive">
            {(mutation.error as Error).message}
          </Card>
        </div>
      )}
    </div>
  );
}