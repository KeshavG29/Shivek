// src/app/supplier/[id]/page.tsx
import { getSupplierById, getMajorCategory } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Bookmark, Building, Calendar, Globe, Award, ShieldCheck, Wrench, Microscope, Factory, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import ProfileHeader from '@/components/supplier-profile/profile-header';
import DetailSection from '@/components/supplier-profile/detail-section';

export default function SupplierProfilePage({ params }: { params: { id: string } }) {
  const supplier = getSupplierById(params.id);

  if (!supplier) {
    notFound();
  }

  const majorCategory = supplier.subcategories.length > 0 ? getMajorCategory(supplier.subcategories[0]) : 'Suppliers';

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/discover" className="hover:text-foreground">Discover Suppliers</Link>
          {majorCategory && (
            <>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-foreground">{majorCategory}</span>
            </>
          )}
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="font-medium text-foreground">{supplier.companyName}</span>
        </div>
        
        <ProfileHeader supplier={supplier} />

        <Separator className="my-8 md:my-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <DetailSection title="Company Overview" icon={Building}>
              <p className="text-muted-foreground">{supplier.overview}</p>
            </DetailSection>

            <DetailSection title="Detailed Capabilities" icon={Wrench}>
              <div className="space-y-6">
                {Object.entries(supplier.capabilities).map(([subcategory, capabilities]) => (
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
            
            <DetailSection title="Infrastructure & Manufacturing" icon={Factory}>
               <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {supplier.infrastructure.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
               </ul>
            </DetailSection>

             <DetailSection title="Quality, Testing & Inspection" icon={Microscope}>
               <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {supplier.quality.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
               </ul>
            </DetailSection>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-1 space-y-8">
            <DetailSection title="Key Highlights" noBorder>
              <ul className="space-y-3 text-muted-foreground">
                {supplier.yearFounded && (
                  <li className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 mt-0.5 text-primary" />
                    <span>In business for <span className="font-semibold text-foreground">{new Date().getFullYear() - supplier.yearFounded}+ years</span></span>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <Globe className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground block">Industries Served</span>
                    {supplier.industries.join(', ')}
                  </div>
                </li>
              </ul>
            </DetailSection>
            
            <Separator />

            <DetailSection title="Certifications & Compliance" icon={Award} noBorder>
                <div className="flex flex-wrap gap-2">
                    {supplier.certifications.map(cert => (
                        <Badge key={cert} variant="secondary" className="font-normal border-dashed border border-border/50 text-sm">
                            {cert}
                        </Badge>
                    ))}
                </div>
            </DetailSection>
            
            <Separator />
            
             <div className="sticky top-24 bg-secondary/50 p-6 rounded-lg border border-border">
                <h3 className="font-headline text-xl font-bold mb-4">Ready to Engage?</h3>
                <p className="text-muted-foreground mb-6">Contact the supplier directly for quotes, inquiries, or partnership opportunities.</p>
                 <Button size="lg" className="w-full">
                    Send RFQ / Inquiry
                    <Send className="ml-2 h-4 w-4" />
                </Button>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}
