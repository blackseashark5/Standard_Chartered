export type LoanType = 'personal' | 'business' | 'home' | 'education';

export interface LoanApplication {
  status: 'pending' | 'approved' | 'rejected' | 'more-info';
  type?: LoanType;
  amount?: number;
  tenure?: number;
  documents: {
    aadhaar?: File;
    pan?: File;
    incomeProof?: File;
    bankStatements?: File;
    propertyDocs?: File;
  };
  videoResponse?: File;
}

export interface UserDetails {
  name: string;
  dateOfBirth: string;
  income: number;
  employmentType: 'salaried' | 'self-employed' | 'business';
  experience: number;
  creditScore?: number;
}

export interface AIQuestion {
  id: number;
  question: string;
  type: 'text' | 'number' | 'select' | 'video';
  options?: string[];
  validation?: (value: any) => boolean;
  required?: boolean;
}