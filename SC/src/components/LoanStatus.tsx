import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface LoanStatusProps {
  status: 'pending' | 'approved' | 'rejected' | 'more-info';
  language: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    progress: 60,
    messages: {
      english: 'Your application is being processed',
      hindi: 'आपका आवेदन प्रक्रिया में है',
      tamil: 'உங்கள் விண்ணப்பம் செயலாக்கப்படுகிறது',
      telugu: 'మీ దరఖాస్తు ప్రాసెస్ చేయబడుతోంది'
    }
  },
  approved: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    progress: 100,
    messages: {
      english: 'Congratulations! Your loan has been approved 🎉',
      hindi: 'बधाई हो! आपका लोन मंजूर हो गया है 🎉',
      tamil: 'வாழ்த்துகள்! உங்கள் கடன் அங்கீகரிக்கப்பட்டது 🎉',
      telugu: 'అభినందనలు! మీ రుణం ఆమోదించబడింది 🎉'
    }
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    progress: 100,
    messages: {
      english: 'We regret to inform that your loan application was not approved',
      hindi: 'हमें खेद है कि आपका लोन आवेदन स्वीकृत नहीं हुआ',
      tamil: 'உங்கள் கடன் விண்ணப்பம் அங்கீகரிக்கப்படவில்லை என்பதை தெரிவிக்க வருந்துகிறோம்',
      telugu: 'మీ రుణ దరఖాస్తు ఆమోదించబడలేదని తెలియజేయడానికి చింతిస్తున్నాము'
    }
  },
  'more-info': {
    icon: AlertCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    progress: 80,
    messages: {
      english: 'We need some additional information to process your application',
      hindi: 'आपके आवेदन को प्रोसेस करने के लिए हमें कुछ अतिरिक्त जानकारी की आवश्यकता है',
      tamil: 'உங்கள் விண்ணப்பத்தை செயலாக்க கூடுதல் தகவல் தேவை',
      telugu: 'మీ దరఖాస్తును ప్రాసెస్ చేయడానికి అదనపు సమాచారం అవసరం'
    }
  }
};

export function LoanStatus({ status, language }: LoanStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-8 rounded-xl border",
          config.borderColor,
          config.bgColor
        )}
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "rounded-full p-3",
            status === 'pending' ? 'bg-yellow-100' :
            status === 'approved' ? 'bg-green-100' :
            status === 'rejected' ? 'bg-red-100' : 'bg-blue-100'
          )}>
            <Icon className={cn("w-8 h-8", config.color)} />
          </div>
          <div>
            <h3 className={cn("text-xl font-semibold mb-1", config.color)}>
              {config.messages[language as keyof typeof config.messages]}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${config.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn(
                  "h-full rounde d-full",
                  status === 'pending' ? 'bg-yellow-500' :
                  status === 'approved' ? 'bg-green-500' :
                  status === 'rejected' ? 'bg-red-500' : 'bg-blue-500'
                )}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {status === 'approved' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
        >
          <h4 className="text-lg font-medium text-gray-900">Next Steps:</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Our representative will contact you within 24 hours
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Keep your documents ready for verification
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Funds will be disbursed after document verification
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}