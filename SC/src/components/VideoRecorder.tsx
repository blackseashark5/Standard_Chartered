import React, { useState, useRef } from 'react';
import { Video, StopCircle, RefreshCcw, CheckCircle } from 'lucide-react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface VideoRecorderProps {
  onRecordingComplete: (recording: File) => void;
  language: string;
}

const instructions = {
  english: {
    title: "Record Your Response",
    description: "Please answer the following questions clearly:",
    questions: [
      "What is the purpose of your loan application?",
      "How do you plan to repay the loan?",
      "What is your current monthly income?"
    ]
  },
  hindi: {
    title: "अपना जवाब रिकॉर्ड करें",
    description: "कृपया निम्नलिखित प्रश्नों का स्पष्ट उत्तर दें:",
    questions: [
      "आपके लोन आवेदन का उद्देश्य क्या है?",
      "आप लोन का भुगतान कैसे करने की योजना बना रहे हैं?",
      "आपकी वर्तमान मासिक आय क्या है?"
    ]
  },
  tamil: {
    title: "உங்கள் பதிலை பதிவு செய்யவும்",
    description: "பின்வரும் கேள்விகளுக்கு தெளிவாக பதிலளிக்கவும்:",
    questions: [
      "உங்கள் கடன் விண்ணப்பத்தின் நோக்கம் என்ன?",
      "கடனை எவ்வாறு திருப்பிச் செலுத்த திட்டமிடுகிறீர்கள்?",
      "உங்கள் தற்போதைய மாத வருமானம் என்ன?"
    ]
  },
  telugu: {
    title: "మీ సమాధానాన్ని రికార్డ్ చేయండి",
    description: "దయచేసి క్రింది ప్రశ్నలకు స్పష్టంగా సమాధానం ఇవ్వండి:",
    questions: [
      "మీ రుణ దరఖాస్తు ఉద్దేశ్యం ఏమిటి?",
      "రుణాన్ని ఎలా తిరిగి చెల్లించాలని యోచిస్తున్నారు?",
      "మీ ప్రస్తుత నెలవారీ ఆదాయం ఎంత?"
    ]
  }
};

export function VideoRecorder({ onRecordingComplete, language }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const startRecording = async () => {
    setRecordedChunks([]);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          handleStartRecording();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    const stream = webcamRef.current?.video?.srcObject as MediaStream;
    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.start();
    }
  };

  const handleDataAvailable = ({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedChunks(prev => [...prev, data]);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setIsPreviewing(true);
  };

  const handleRetake = () => {
    setRecordedChunks([]);
    setIsPreviewing(false);
  };

  const handleSubmit = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const file = new File([blob], 'response.webm', { type: 'video/webm' });
      onRecordingComplete(file);
    }
  };

  const currentLang = instructions[language as keyof typeof instructions];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{currentLang.title}</h2>
        <p className="text-gray-600">{currentLang.description}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-medium text-gray-900 mb-3">Questions:</h3>
        <ul className="space-y-2">
          {currentLang.questions.map((question, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                {index + 1}
              </span>
              {question}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-full max-w-2xl mx-auto aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-xl">
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"
            >
              <span className="text-6xl font-bold text-white">{countdown}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {isPreviewing && recordedChunks.length > 0 ? (
          <video
            autoPlay
            loop
            className="w-full h-full object-cover"
            src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/webm' }))}
          />
        ) : (
          <Webcam
            ref={webcamRef}
            audio
            muted
            className="w-full h-full object-cover"
          />
        )}

        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm text-white">Recording</span>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        {!isRecording && !isPreviewing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Video className="w-5 h-5" />
            <span>Start Recording</span>
          </motion.button>
        )}

        {isRecording && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopRecording}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <StopCircle className="w-5 h-5" />
            <span>Stop Recording</span>
          </motion.button>
        )}

        {isPreviewing && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetake}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Retake</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Submit</span>
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}