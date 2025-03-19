import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface DocumentUploadProps {
  onUpload: (file: File, type: string) => void;
  documents: Record<string, File | undefined>;
  language: string;
}

const documentTypes = {
  aadhaar: {
    label: {
      english: 'Aadhaar Card',
      hindi: 'आधार कार्ड',
      tamil: 'ஆதார் கார்டு',
      telugu: 'ఆధార్ కార్డు'
    },
    description: 'Upload a clear photo or scan of your Aadhaar card',
    required: true
  },
  pan: {
    label: {
      english: 'PAN Card',
      hindi: 'पैन कार्ड',
      tamil: 'பான் கார்டு',
      telugu: 'పాన్ కార్డు'
    },
    description: 'Upload a clear photo or scan of your PAN card',
    required: true
  },
  incomeProof: {
    label: {
      english: 'Income Proof',
      hindi: 'आय प्रमाण',
      tamil: 'வருமான சான்று',
      telugu: 'ఆదాయ ధృవీకరణ'
    },
    description: 'Salary slips or IT returns for the last 3 months',
    required: true
  },
  bankStatements: {
    label: {
      english: 'Bank Statements',
      hindi: 'बैंक स्टेटमेंट',
      tamil: 'வங்கி அறிக்கைகள்',
      telugu: 'బ్యాంకు స్టేట్మెంట్లు'
    },
    description: 'Last 6 months bank statements',
    required: true
  }
};

export function DocumentUpload({ onUpload, documents, language }: DocumentUploadProps) {
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(type);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(null);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file, type);
      setError(null);
    } else {
      setError('Please upload an image file');
    }
  }, [onUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file, type);
      setError(null);
    } else {
      setError('Please upload an image file');
    }
  }, [onUpload]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Document Verification</h2>
        <p className="text-gray-600">Please upload clear, readable copies of your documents</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(documentTypes).map(([type, info]) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative rounded-xl overflow-hidden",
              "border-2 border-dashed transition-colors",
              dragOver === type ? "border-blue-500 bg-blue-50" : "border-gray-300",
              documents[type] ? "bg-green-50 border-green-300" : "hover:border-blue-400"
            )}
            onDragOver={(e) => handleDragOver(e, type)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, type)}
          >
            <input
              type="file"
              id={type}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, type)}
              accept="image/*"
            />
            <div className="p-6">
              <div className="flex items-start gap-4">
                {documents[type] ? (
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                ) : (
                  <div className="rounded-full bg-gray-100 p-3">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {info.label[language as keyof typeof info.label]}
                    {info.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                  {documents[type] && (
                    <p className="text-sm text-green-600 mt-2">
                      Document uploaded successfully
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}