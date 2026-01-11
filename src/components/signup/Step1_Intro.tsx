// src/components/signup/Step1_Intro.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, Target } from 'lucide-react';
import Link from 'next/link';
import { useOnboardingContext } from './OnboardingContext';

const benefits = [
    {
        icon: Target,
        title: 'Get Discovered',
        description: 'List your company in a structured, defense-focused taxonomy to be found by relevant procurement teams.',
    },
    {
        icon: ShieldCheck,
        title: 'Showcase Your Credentials',
        description: 'Highlight your critical certifications, compliance standards, and detailed capabilities to build trust.',
    },
    {
        icon: CheckCircle,
        title: 'Receive Qualified RFQs',
        description: 'Connect with buyers who are searching for your specific manufacturing or service capabilities.',
    }
];

export default function Step1_Intro() {
  const { setCurrentStep } = useOnboardingContext();

  return (
    <div className="text-center">
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
        Get discovered by defense & aerospace procurement teams.
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
        Join a trusted network of verified suppliers. Showcase your capabilities, certifications, and compliance to connect with buyers on mission-critical programs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 text-left">
          {benefits.map(benefit => (
             <Card key={benefit.title} className="bg-secondary/30">
                <CardHeader className="flex flex-row items-center gap-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
             </Card>
          ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button size="lg" onClick={() => setCurrentStep(1)}>
          Get Started
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/supplier/sup-001" target="_blank">View Example Profile</Link>
        </Button>
      </div>
    </div>
  );
}
