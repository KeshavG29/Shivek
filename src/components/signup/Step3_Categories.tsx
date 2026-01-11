// src/components/signup/Step3_Categories.tsx
'use client';
import { useState } from 'react';
import { useOnboardingContext } from './OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { taxonomy } from '@/lib/dummy-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MAX_SUBCATEGORIES = 15;

export default function Step3_Categories() {
  const { formData, updateFormData, setCurrentStep } = useOnboardingContext();
  const [selected, setSelected] = useState<string[]>(formData.subcategories);

  const handleSelect = (subcategory: string, isChecked: boolean) => {
    setSelected(prev => {
      if (isChecked) {
        if (prev.length < MAX_SUBCATEGORIES) {
          return [...prev, subcategory];
        }
        // Optionally, show a toast or message that the limit is reached
        return prev;
      } else {
        return prev.filter(item => item !== subcategory);
      }
    });
  };
  
  const handleSubmit = () => {
    updateFormData({ subcategories: selected });
    setCurrentStep(prev => prev + 1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category & Sub-Category Selection</CardTitle>
        <CardDescription>
          Select the sub-categories that best represent your core offerings. This is critical for how buyers will find you.
          You can select up to {MAX_SUBCATEGORIES} sub-categories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
          <Accordion type="multiple" className="w-full" defaultValue={Object.keys(taxonomy)}>
            {Object.entries(taxonomy).map(([majorCategory, subcategories]) => (
              <AccordionItem value={majorCategory} key={majorCategory}>
                <AccordionTrigger className="font-semibold text-base">{majorCategory}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
                    {Object.keys(subcategories).map((subcategory) => (
                      <div key={subcategory} className="flex items-center space-x-2">
                        <Checkbox
                          id={subcategory}
                          checked={selected.includes(subcategory)}
                          onCheckedChange={(checked) => handleSelect(subcategory, !!checked)}
                          disabled={!selected.includes(subcategory) && selected.length >= MAX_SUBCATEGORIES}
                        />
                        <Label htmlFor={subcategory} className="font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                          {subcategory}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="flex justify-between pt-8 mt-4 border-t">
          <Button type="button" variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)}>
            Back
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{selected.length} / {MAX_SUBCATEGORIES} selected</span>
            <Button type="button" onClick={handleSubmit} disabled={selected.length === 0}>
              Next: Add Capabilities
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
