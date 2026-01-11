// src/components/signup/Step6_Review.tsx
'use client';
import { useOnboardingContext } from './OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ProfileHeader from '@/components/supplier-profile/profile-header';
import DetailSection from '@/components/supplier-profile/detail-section';
import { Separator } from '@/components/ui/separator';
import { Building, Wrench, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export default function Step6_Review() {
  const { formData, setCurrentStep } = useOnboardingContext();
  
  const handleSubmit = () => {
    console.log("Final form data submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Profile submitted for review!");
    setCurrentStep(0); // Reset to start
  };

  const supplierForPreview = {
      ...formData,
      yearFounded: formData.yearFounded || new Date().getFullYear(),
      description: formData.website || "A leading provider in the defense and aerospace sector.",
      overview: `Established as a premier ${formData.companyType}, ${formData.companyName} is dedicated to delivering high-quality solutions from our base in ${formData.location}.`,
      infrastructure: formData.infrastructure || ["State-of-the-art facilities", "Advanced testing equipment"],
      quality: formData.quality || ["Follows ISO 9001 standards", "IPC-A-610 certified technicians"],
      industries: formData.industries || ["Defense", "Aerospace"],
      id: "preview-id",
      verified: false,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
        <CardDescription>
          This is a preview of how your profile will appear to buyers on RakshaBase. Please review all information for accuracy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-8 border rounded-lg bg-secondary/20">
            <div className="bg-background text-foreground p-6 rounded-md shadow-md">
                <ProfileHeader supplier={supplierForPreview} />
                <Separator className="my-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-10">
                        <DetailSection title="Company Overview" icon={Building}>
                            <p className="text-muted-foreground">{supplierForPreview.overview}</p>
                        </DetailSection>

                        <DetailSection title="Detailed Capabilities" icon={Wrench}>
                            <div className="space-y-4">
                                {Object.entries(supplierForPreview.capabilities).map(([subcategory, capabilities]) => (
                                <div key={subcategory}>
                                    <h4 className="font-semibold text-foreground mb-2">{subcategory}</h4>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {capabilities.map((capability, index) => (
                                        <li key={index}>{capability}</li>
                                    ))}
                                    </ul>
                                </div>
                                ))}
                            </div>
                        </DetailSection>
                    </div>
                     <aside className="md:col-span-1">
                        <DetailSection title="Certifications & Compliance" icon={Award} noBorder>
                            <div className="flex flex-wrap gap-2">
                                {supplierForPreview.certifications.map(cert => (
                                    <Badge key={cert} variant="secondary" className="font-normal border-dashed border border-border/50 text-sm">
                                        {cert}
                                    </Badge>
                                ))}
                                {supplierForPreview.certifications.length === 0 && <p className="text-sm text-muted-foreground">No certifications listed.</p>}
                            </div>
                        </DetailSection>
                    </aside>
                </div>
            </div>
        </div>
        
        <Alert className="mt-8">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Ready to Submit?</AlertTitle>
            <AlertDescription>
               By submitting, your profile will be sent for review to ensure it meets RakshaBase quality standards. You can edit and enhance your profile anytime from your supplier dashboard after approval.
            </AlertDescription>
        </Alert>

        <div className="flex justify-between pt-8 mt-4 border-t">
          <Button type="button" variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)}>
            Back
          </Button>
          <Button type="button" size="lg" onClick={handleSubmit}>
            Submit for Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
