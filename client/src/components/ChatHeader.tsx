import React from 'react';
import { Settings, SplitSquareVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ChatHeader = () => {
  return (
    <motion.div 
      className="w-full border-b border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-lg font-semibold">New Chat</h1>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-accent hover:text-accent-foreground"
          >
            <SplitSquareVertical className="h-4 w-4" />
            <span>Add Split Chat</span>
          </Button>
          
          <Button 
            variant="ghost"
            size="icon"
            className="p-2 text-gray-700 hover:bg-accent hover:text-accent-foreground rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
