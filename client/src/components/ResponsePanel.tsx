import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ChatMessage {
  content: string;
  timestamp: Date;
}

interface ResponsePanelProps {
  response?: string;
  isLoading: boolean;
  accentColor: string;
}

const ResponsePanel = ({
  response,
  isLoading,
  accentColor,
}: ResponsePanelProps) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Add new response to chat history when received
  useEffect(() => {
    if (response) {
      setChatHistory(prev => [
        ...prev,
        { content: response, timestamp: new Date() }
      ]);
    }
  }, [response]);

  const colorClasses = {
    blue: "border-blue-500/20 hover:border-blue-500/30",
    purple: "border-purple-500/20 hover:border-purple-500/30",
    green: "border-green-500/20 hover:border-green-500/30",
  }[accentColor] || "border-gray-200";

  return (
    <Card className={cn(
      "transition-all duration-300 border-2",
      colorClasses,
      !response && !isLoading && "opacity-50"
    )}>
      <CardContent className="p-2 md:p-4 lg:p-6">
        <ScrollArea className="h-[400px] pr-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </motion.div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    className="border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs text-gray-400 ml-2">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ResponsePanel;