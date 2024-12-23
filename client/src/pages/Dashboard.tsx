import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import QueryInput from "@/components/QueryInput";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { compareResponses } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import ResponsePanel from "@/components/ResponsePanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const AIHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <motion.div 
    className="flex flex-col items-center justify-center p-2 md:p-4 space-y-2 border-b border-gray-200"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-3">{icon}</div>
    <h2 className="text-sm font-medium text-gray-700">{title}</h2>
  </motion.div>
);

export default function Dashboard() {
  const { toast } = useToast();

  useEffect(() => {
    console.log('Dashboard mounted');
    return () => console.log('Dashboard unmounted');
  }, []);

  const mutation = useMutation({
    mutationFn: compareResponses,
    onMutate: (variables) => {
      console.log('Starting mutation with query:', variables);
    },
    onError: (error) => {
      console.error('API Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get AI responses",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      console.log('Mutation succeeded:', data);
    },
    onSettled: () => {
      console.log('Mutation settled');
    }
  });

  const handleSubmit = async (input: string) => {
    console.log('Handling submit with input:', input);
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    try {
      await mutation.mutateAsync(input);
    } catch (err) {
      console.error('Mutation error:', err);
    }
  };

  return (
    <motion.div 
      className="h-screen flex flex-col bg-white max-w-7xl mx-auto p-4 md:p-6 lg:p-8"
      initial="hidden"
      animate="visible"
    >
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup 
          direction="horizontal" 
          className="h-full rounded-lg border"
        >
          {/* Gemini Section */}
          <ResizablePanel defaultSize={33.33}>
            <div className="h-full">
              <AIHeader
                icon={<img src="/assets/Gemini.png" alt="Gemini AI" className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain" />}
                title="Start chatting with Gemini"
              />
              <ResponsePanel
                response={mutation.data?.gemini}
                isLoading={mutation.isPending}
                accentColor="blue"
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* OpenAI Section */}
          <ResizablePanel defaultSize={33.33}>
            <div className="h-full">
              <AIHeader
                icon={<img src="/assets/ChatGPT.png" alt="ChatGPT" className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain" />}
                title="Start chatting with ChatGPT"
              />
              <ResponsePanel
                response={mutation.data?.openai}
                isLoading={mutation.isPending}
                accentColor="green"
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Claude Section */}
          <ResizablePanel defaultSize={33.33}>
            <div className="h-full">
              <AIHeader
                icon={<img src="/assets/Claude.png" alt="Claude AI" className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain" />}
                title="Start chatting with Claude"
              />
              <ResponsePanel
                response={mutation.data?.claude}
                isLoading={mutation.isPending}
                accentColor="purple"
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>

      {/* Footer Input */}
      <motion.footer 
        className="border-t border-gray-200 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-full md:max-w-3xl mx-auto px-2 md:px-4 py-2 md:py-3">
          <QueryInput 
            onSubmit={handleSubmit} 
            isLoading={mutation.isPending}
            className="min-h-[60px] md:min-h-[80px]"
          />
        </div>
      </motion.footer>

      {mutation.error && (
        <motion.div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="p-4 bg-destructive/10 text-destructive">
            {(mutation.error as Error).message}
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}