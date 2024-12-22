import React from 'react';
import { Settings, SplitSquareVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { SettingsMenu } from "@/components/Settings";

export const ChatHeader = () => {
  return (
    <motion.div 
      className="border-b border-gray-200 bg-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with controls */}
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-lg font-semibold text-gray-900">New Chat</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Add Split Chat"
          >
            <SplitSquareVertical className="h-4 w-4" />
            <span>Add Split Chat</span>
          </Button>
          <SettingsMenu />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
