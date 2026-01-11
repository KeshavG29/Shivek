// src/components/signup/Step2_CompanyInfo.tsx
'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useOnboardingContext } from './OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { filterOptions } from '@/lib/dummy-data';

const companyInfoSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  companyType: z.enum(filterOptions.supplierTypes as [string, ...string[]], {
      errorMap: () => ({ message: "Please select a valid supplier type." }),
  }),
  location: z.string().min(2, { message: "Location is required." }),
  businessEmail: z.string().email({ message: "Please enter a valid email address." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

export default function Step2_CompanyInfo() {
  const { formData, updateFormData, setCurrentStep } = useOnboardingContext();
  
  const form = useForm<CompanyInfoFormData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: formData.companyName,
      companyType: formData.companyType,
      location: formData.location,
      businessEmail: formData.businessEmail,
      website: formData.website,
    },
  });

  const onSubmit = (data: CompanyInfoFormData) => {
    updateFormData(data);
    setCurrentStep(prev => prev + 1);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Basic Company Information</CardTitle>
        <CardDescription>Start by telling us the basics about your company. This information will be used to create your profile.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Acme Aerospace Dynamics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="companyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Type</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filterOptions.supplierTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Location (City, Country)</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Bengaluru, India" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="businessEmail"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="e.g., contact@acme-aerospace.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Official Website (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.acme-aerospace.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4">
              <Button type="button" variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)}>
                Back
              </Button>
              <Button type="submit">
                Next: Select Categories
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
