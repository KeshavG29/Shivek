// src/app/signup/page.tsx
'use client';
import { useState } from 'react';
import Step1_Intro from '@/components/signup/Step1_Intro';
import Step2_CompanyInfo from '@/components/signup/Step2_CompanyInfo';
import Step3_Categories from '@/components/signup/Step3_Categories';
import Step4_Capabilities from '@/components/signup/Step4_Capabilities';
import Step5_Certifications from '@/components/signup/Step5_Certifications';
import Step6_Review from '@/components/signup/Step6_Review';
import { OnboardingProvider, useOnboardingContext } from '@/components/signup/OnboardingContext';
import { Progress } from '@/components/ui/progress';

const STEPS = [
  'Introduction',
  'Company Information',
  'Categories',
  'Capabilities',
  'Certifications',
  'Review & Submit',
];

function OnboardingWizard() {
  const { currentStep, setCurrentStep } = useOnboardingContext();
  const progress = Math.round(((currentStep + 1) / STEPS.length) * 100);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1_Intro />;
      case 1:
        return <Step2_CompanyInfo />;
      case 2:
        return <Step3_Categories />;
      case 3:
        return <Step4_Capabilities />;
      case 4:
        return <Step5_Certifications />;
      case 5:
        return <Step6_Review />;
      default:
        return <Step1_Intro />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
       {currentStep > 0 && (
         <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-primary">{`Step ${currentStep} of ${STEPS.length - 1}: ${STEPS[currentStep]}`}</h2>
                <span className="text-sm text-muted-foreground">{progress}% Complete</span>
            </div>
          <Progress value={progress} className="w-full h-2" />
        </div>
      )}
      {renderStep()}
    </div>
  );
}

export default function SignupPage() {
    return (
        <OnboardingProvider>
            <OnboardingWizard />
        </OnboardingProvider>
    )
}
