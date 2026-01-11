// src/components/signup/OnboardingContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Supplier } from '@/lib/types';

// Define the shape of your form data
// This can be expanded as you build out the steps
type OnboardingFormData = Partial<Supplier> & {
    companyName: string;
    companyType: Supplier['type'];
    location: string;
    businessEmail: string;
    website?: string;
    subcategories: string[];
    capabilities: Record<string, string[]>;
    certifications: string[];
};

// Define the shape of the context
interface OnboardingContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formData: OnboardingFormData;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
}

// Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Create a provider component
export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({
    companyName: '',
    companyType: 'Manufacturer',
    location: '',
    businessEmail: '',
    website: '',
    subcategories: [],
    capabilities: {},
    certifications: [],
    id: 'temp-id',
    description: '',
    overview: '',
    industries: [],
    verified: false,
    infrastructure: [],
    quality: [],
  });

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const value = {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Create a custom hook to use the context
export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
};
