import React from 'react';
import { Settings, SplitSquareVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { GeminiLogo, OpenAILogo, ClaudeLogo } from '@/components/icons/AILogos';

const ChatHeader = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="border-b border-gray-200 bg-white"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-lg font-semibold text-gray-900">New Chat</h1>
        <div className="flex items-center gap-2">
          <motion.button
            variants={buttonVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Add Split Chat"
          >
            <SplitSquareVertical className="h-4 w-4" />
            <span>Add Split Chat</span>
          </motion.button>
          <motion.button
            variants={buttonVariants}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* AI Options Grid */}
      <motion.div 
        className="grid grid-cols-3 divide-x divide-gray-200"
        variants={headerVariants}
      >
        {/* Gemini */}
        <motion.button 
          className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition-colors"
          variants={buttonVariants}
        >
          <div className="mb-3">
            <GeminiLogo />
          </div>
          <span className="text-sm font-medium text-gray-700">Start chatting with Gemini</span>
        </motion.button>

        {/* ChatGPT */}
        <motion.button 
          className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition-colors"
          variants={buttonVariants}
        >
          <div className="mb-3">
            <OpenAILogo />
          </div>
          <span className="text-sm font-medium text-gray-700">Start chatting with ChatGPT</span>
        </motion.button>

        {/* Claude */}
        <motion.button 
          className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition-colors"
          variants={buttonVariants}
        >
          <div className="mb-3">
            <ClaudeLogo />
          </div>
          <span className="text-sm font-medium text-gray-700">Start chatting with Claude</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ChatHeader;