import { useState } from "react";
import { Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import QueryInput from "@/components/QueryInput";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { compareResponses } from "@/lib/api";
import type { AIResponse } from "@/lib/api";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import ResponsePanel from "@/components/ResponsePanel";
import { motion } from "framer-motion";

const AIHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <motion.div 
    className="ai-header flex flex-col items-center justify-center p-4 border-b border-gray-200"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="h-screen flex flex-col bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
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
        <motion.div 
          className="flex flex-col h-full"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <AIHeader
            icon={<img src="/assets/Gemini.png" alt="Gemini AI" className="w-full h-full object-contain" />}
            title="Start chatting with Gemini"
          />
          <ResponsePanel
            title="Gemini Response"
            response={mutation.data?.gemini}
            isLoading={mutation.isPending}
            accentColor="blue"
          />
        </motion.div>

        {/* OpenAI Section */}
        <motion.div 
          className="flex flex-col h-full"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <AIHeader
            icon={<img src="/assets/ChatGPT.png" alt="ChatGPT" className="w-full h-full object-contain" />}
            title="Start chatting with ChatGPT"
          />
          <ResponsePanel
            title="ChatGPT Response"
            response={mutation.data?.openai}
            isLoading={mutation.isPending}
            accentColor="green"
          />
        </motion.div>

        {/* Claude Section */}
        <motion.div 
          className="flex flex-col h-full"
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <AIHeader
            icon={<img src="/assets/Claude.png" alt="Claude AI" className="w-full h-full object-contain" />}
            title="Start chatting with Claude"
          />
          <ResponsePanel
            title="Claude Response"
            response={mutation.data?.claude}
            isLoading={mutation.isPending}
            accentColor="purple"
          />
        </motion.div>
      </main>

      {/* Footer Input */}
      <motion.footer 
        className="border-t border-gray-200 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3">
          <QueryInput onSubmit={handleSubmit} isLoading={mutation.isPending} />
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