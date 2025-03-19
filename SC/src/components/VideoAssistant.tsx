import React, { useState, useEffect } from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface VideoAssistantProps {
  onComplete: () => void;
  language: string;
}

const videoUrls = {
  english: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
  hindi: "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
  tamil: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
  telugu: "https://images.unsplash.com/photo-1590650153855-d9e808231d41"
};

const welcomeMessages = {
  english: "Welcome to Virtual Branch Manager",
  hindi: "वर्चुअल ब्रांच मैनेजर में आपका स्वागत है",
  tamil: "மெய்நிகர் கிளை மேலாளருக்கு வரவேற்கிறோம்",
  telugu: "వర్చువల్ బ్రాంచ్ మేనేజర్‌కు స్వాగతం"
};

export function VideoAssistant({ onComplete, language }: VideoAssistantProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setIsPlaying(false);
            onComplete();
          }
          return newProgress;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, onComplete]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video w-full max-w-4xl mx-auto shadow-2xl"
      >
        <img
          src={videoUrls[language as keyof typeof videoUrls]}
          alt="AI Bank Manager"
          className="w-full h-full object-cover opacity-90"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-8 text-center"
          >
            {welcomeMessages[language as keyof typeof welcomeMessages]}
          </motion.h2>
          
          <motion.button
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-full",
              "bg-white/90 hover:bg-white text-gray-900",
              "transition-all duration-200 shadow-lg",
              "font-medium text-lg"
            )}
          >
            {isPlaying ? (
              <>
                <PauseCircle className="w-6 h-6" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-6 h-6" />
                <span>Start Consultation</span>
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-blue-500"
                transition={{ duration: 0.1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="max-w-2xl mx-auto text-center">
        <p className="text-gray-600">
          Our AI-powered Virtual Branch Manager will guide you through the loan application process,
          making it simple and convenient. Please ensure you have your documents ready.
        </p>
      </div>
    </div>
  );
}