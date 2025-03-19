import React, { useState } from 'react';
import { VideoAssistant } from './components/VideoAssistant';
import { DocumentUpload } from './components/DocumentUpload';
import { VideoRecorder } from './components/VideoRecorder';
import { LoanStatus } from './components/LoanStatus';
import type { LoanApplication, LoanType } from './types';
import { Languages, IndianRupee, Clock, Briefcase, Home, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './utils/cn';

const loanTypes: { type: LoanType; icon: any; label: string; description: string }[] = [
  {
    type: 'personal',
    icon: IndianRupee,
    label: 'Personal Loan',
    description: 'Quick personal loans with minimal documentation'
  },
  {
    type: 'business',
    icon: Briefcase,
    label: 'Business Loan',
    description: 'Grow your business with flexible financing options'
  },
  {
    type: 'home',
    icon: Home,
    label: 'Home Loan',
    description: 'Make your dream home a reality with competitive rates'
  },
  {
    type: 'education',
    icon: GraduationCap,
    label: 'Education Loan',
    description: 'Invest in your future with education financing'
  }
];

function App() {
  const [step, setStep] = useState(1);
  const [application, setApplication] = useState<LoanApplication>({
    status: 'pending',
    documents: {},
  });
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null);

  const handleDocumentUpload = (file: File, type: string) => {
    setApplication(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: file
      }
    }));
  };

  const handleVideoResponse = (recording: File) => {
    setApplication(prev => ({
      ...prev,
      videoResponse: recording,
      status: 'approved' // Simulated approval - in real app would be based on actual verification
    }));
    setStep(4);
  };

  const handleLoanTypeSelect = (type: LoanType) => {
    setSelectedLoanType(type);
    setApplication(prev => ({ ...prev, type }));
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Virtual Branch Manager</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-gray-600" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="english">English</option>
                  <option value="hindi">हिंदी</option>
                  <option value="tamil">தமிழ்</option>
                  <option value="telugu">తెలుగు</option>
                </select>
              </div>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Processing time: ~2 mins</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Progress Steps */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((number) => (
                <div key={number} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: number * 0.1 }}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      "transition-colors duration-200",
                      step >= number
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    )}
                  >
                    {number}
                  </motion.div>
                  {number < 4 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: number * 0.1 }}
                      className={cn(
                        "w-16 h-1 origin-left",
                        step > number ? "bg-blue-600" : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to Virtual Branch Manager
                  </h2>
                  <p className="text-gray-600">
                    Choose your loan type to begin the application process
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {loanTypes.map(({ type, icon: Icon, label, description }) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLoanTypeSelect(type)}
                      className={cn(
                        "p-6 rounded-xl text-left transition-all",
                        "border-2 hover:border-blue-500",
                        selectedLoanType === type
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-blue-100 p-3">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{label}</h3>
                          <p className="text-sm text-gray-500 mt-1">{description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <VideoAssistant
                onComplete={() => setStep(3)}
                language={selectedLanguage}
              />
            )}

            {step === 3 && (
              <DocumentUpload
                onUpload={handleDocumentUpload}
                documents={application.documents}
                language={selectedLanguage}
              />
            )}

            {step === 4 && (
              <div className="space-y-6">
                <VideoRecorder
                  onRecordingComplete={handleVideoResponse}
                  language={selectedLanguage}
                />
              </div>
            )}

            {step === 5 && (
              <LoanStatus
                status={application.status}
                language={selectedLanguage}
              />
            )}

            {/* Navigation Buttons */}
            {step > 1 && step < 5 && (
              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </motion.button>
                {step < 4 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;