import { Settings2, SplitSquareVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ChatHeader() {
  return (
    <motion.div 
      className="w-full border-b border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-lg font-semibold">New Chat</h1>
        
        {/* Controls container with proper spacing */}
        <div className="flex items-center space-x-4">
          {/* Split Chat button with label */}
          <Button 
            variant="ghost"
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <SplitSquareVertical className="h-4 w-4" />
            <span>Add Split Chat</span>
          </Button>
          
          {/* Settings button */}
          <Button 
            variant="ghost"
            size="icon"
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat options grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <motion.button 
          className="flex flex-col items-center p-4 space-y-2 rounded-lg hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
            G
          </div>
          <span className="text-sm">Start chatting with Gemini</span>
        </motion.button>

        <motion.button 
          className="flex flex-col items-center p-4 space-y-2 rounded-lg hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
            GPT
          </div>
          <span className="text-sm">Start chatting with ChatGPT</span>
        </motion.button>

        <motion.button 
          className="flex flex-col items-center p-4 space-y-2 rounded-lg hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
            C
          </div>
          <span className="text-sm">Start chatting with Claude</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
