// src/components/signup/Step5_Certifications.tsx
'use client';
import { useState } from 'react';
import { useOnboardingContext } from './OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { filterOptions } from '@/lib/dummy-data';

export default function Step5_Certifications() {
  const { formData, updateFormData, setCurrentStep } = useOnboardingContext();
  const [selected, setSelected] = useState<string[]>(formData.certifications || []);

  const handleSelect = (certification: string, isChecked: boolean) => {
    setSelected(prev => {
      if (isChecked) {
        return [...prev, certification];
      } else {
        return prev.filter(item => item !== certification);
      }
    });
  };
  
  const handleSubmit = () => {
    updateFormData({ certifications: selected });
    setCurrentStep(prev => prev + 1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance & Certifications</CardTitle>
        <CardDescription>
          Select all certifications and compliance standards your company holds. This is critical for building trust with buyers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4 className="font-semibold">Quality & Industry Certifications</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filterOptions.certifications.map((cert) => (
              <div key={cert} className="flex items-center space-x-2">
                <Checkbox
                  id={cert}
                  checked={selected.includes(cert)}
                  onCheckedChange={(checked) => handleSelect(cert, !!checked)}
                />
                <Label htmlFor={cert} className="font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                  {cert}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground pt-4">You can add more details and upload certificates from your supplier dashboard later.</p>
        </div>
        <div className="flex justify-between pt-8 mt-4 border-t">
          <Button type="button" variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)}>
            Back
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Next: Review Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
