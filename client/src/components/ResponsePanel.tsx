import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
          ) : response ? (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <p className="whitespace-pre-wrap">{response}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ResponsePanel;