// src/components/signup/Step4_Capabilities.tsx
'use client';
import { useState } from 'react';
import { useOnboardingContext } from './OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Wand2, Loader2 } from 'lucide-react';
import { suggestCapabilities } from '@/ai/flows/suggest-capabilities';

export default function Step4_Capabilities() {
  const { formData, updateFormData, setCurrentStep } = useOnboardingContext();
  const [capabilities, setCapabilities] = useState<Record<string, string[]>>(formData.capabilities || {});
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleCapabilityChange = (subcategory: string, index: number, value: string) => {
    setCapabilities(prev => {
      const newCaps = [...(prev[subcategory] || [''])];
      newCaps[index] = value;
      return { ...prev, [subcategory]: newCaps };
    });
  };

  const addCapabilityField = (subcategory: string) => {
    setCapabilities(prev => ({
      ...prev,
      [subcategory]: [...(prev[subcategory] || []), ''],
    }));
  };

  const removeCapabilityField = (subcategory: string, index: number) => {
    setCapabilities(prev => ({
      ...prev,
      [subcategory]: prev[subcategory].filter((_, i) => i !== index),
    }));
  };
  
  const handleGenerateAISuggestions = async () => {
    setLoadingSuggestions(true);
    try {
        const companyInfo = `Company: ${formData.companyName}, Type: ${formData.companyType}, Location: ${formData.location}. Website: ${formData.website}`;
        const result = await suggestCapabilities({
            companyInfo,
            taxonomyOptions: formData.subcategories,
        });

        // Distribute suggestions among selected subcategories
        const suggestions = result.suggestedCapabilities;
        const newCapabilities: Record<string, string[]> = {};
        
        formData.subcategories.forEach((subcat, i) => {
            // Simple distribution, can be made smarter
            const suggestion = suggestions[i % suggestions.length];
            if (suggestion) {
                newCapabilities[subcat] = [suggestion];
            } else {
                 newCapabilities[subcat] = [''];
            }
        });
        setCapabilities(newCapabilities);

    } catch (error) {
        console.error("Error generating AI suggestions:", error);
        // You can add a toast notification here to inform the user
    } finally {
        setLoadingSuggestions(false);
    }
  };

  const handleSubmit = () => {
    // Filter out empty capabilities
    const cleanedCapabilities: Record<string, string[]> = {};
    for (const subcategory in capabilities) {
        const filtered = capabilities[subcategory].filter(cap => cap.trim() !== '');
        if (filtered.length > 0) {
            cleanedCapabilities[subcategory] = filtered;
        }
    }
    updateFormData({ capabilities: cleanedCapabilities });
    setCurrentStep(prev => prev + 1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Detailed Capabilities</CardTitle>
                <CardDescription>
                For each sub-category you selected, list your specific capabilities. Be precise and factual.
                </CardDescription>
            </div>
            <Button variant="outline" onClick={handleGenerateAISuggestions} disabled={loadingSuggestions}>
                 {loadingSuggestions ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Suggest with AI
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {formData.subcategories.map(subcategory => (
            <div key={subcategory} className="space-y-3 p-4 border rounded-lg bg-secondary/30">
              <Label className="font-semibold text-base">{subcategory}</Label>
              {(capabilities[subcategory] || ['']).map((capability, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Textarea
                    placeholder="e.g., MIL-STD-810G compliant vibration testing"
                    value={capability}
                    onChange={(e) => handleCapabilityChange(subcategory, index, e.target.value)}
                    className="bg-background"
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCapabilityField(subcategory, index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addCapabilityField(subcategory)}
              >
                + Add Another Capability
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-8 mt-4 border-t">
          <Button type="button" variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)}>
            Back
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Next: Add Certifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
