// src/components/discover/supplier-card.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Supplier } from '@/lib/types';
import { BadgeCheck, Building, MapPin, Send, PlusCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SupplierCardProps {
  supplier: Supplier;
}

const MAX_TAGS = 3;
const MAX_CERTS = 3;

export default function SupplierCard({ supplier }: SupplierCardProps) {
  const verificationBadge = supplier.verified ? (
     <Badge variant="outline" className="border-green-500 text-green-500 flex items-center gap-1.5 text-xs py-1 px-2">
        <BadgeCheck className="h-3.5 w-3.5" />
        <span>RakshaBase Verified</span>
      </Badge>
  ) : (
     <Badge variant="outline" className="border-amber-500 text-amber-500 flex items-center gap-1.5 text-xs py-1 px-2">
        <span>Self-Declared</span>
      </Badge>
  );

  const displayedTags = supplier.subcategories.slice(0, MAX_TAGS);
  const remainingTags = supplier.subcategories.length - MAX_TAGS;

  const displayedCerts = supplier.certifications.slice(0, MAX_CERTS);
  const remainingCerts = supplier.certifications.length - MAX_CERTS;


  return (
    <div className="bg-secondary/50 border border-border/60 rounded-lg p-6 transition-all hover:border-primary/50 hover:bg-secondary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
        <div>
           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
              <Badge variant="secondary" className="font-normal">{supplier.type}</Badge>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{supplier.location}</span>
              </div>
           </div>

          <h3 className="font-headline text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
            <Link href={`/supplier/${supplier.id}`}>{supplier.companyName}</Link>
          </h3>
        </div>
        <div className="flex-shrink-0">
          {verificationBadge}
        </div>
      </div>
      
      {/* Category Relevance */}
      <div className="mb-4">
         <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Primary Sub-Categories</h4>
         <div className="flex flex-wrap gap-2">
            {displayedTags.map((sub) => (
              <Badge key={sub} variant="outline" className="font-normal">{sub}</Badge>
            ))}
            {remainingTags > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline" className="font-normal flex items-center gap-1">
                      <PlusCircle className="h-3 w-3"/>
                      {remainingTags} more
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{supplier.subcategories.slice(MAX_TAGS).join(', ')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
         </div>
      </div>

       {/* Capability Snapshot */}
       <div className="mb-4">
          <p className="text-sm text-muted-foreground max-w-prose">{supplier.description}</p>
       </div>

      {/* Compliance & Certs */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Certifications & Compliance</h4>
        <div className="flex flex-wrap gap-2">
            {displayedCerts.map((cert) => (
            <Badge key={cert} variant="secondary" className="font-normal border-dashed border border-border/50">{cert}</Badge>
            ))}
            {remainingCerts > 0 && (
                 <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger>
                        <Badge variant="secondary" className="font-normal border-dashed border border-border/50 flex items-center gap-1">
                            <PlusCircle className="h-3 w-3"/>
                            {remainingCerts} more
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{supplier.certifications.slice(MAX_CERTS).join(', ')}</p>
                    </TooltipContent>
                    </Tooltip>
              </TooltipProvider>
            )}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
         <div>
            {supplier.yearFounded && (
                <p className="text-sm text-muted-foreground">
                    In business for <span className="font-semibold text-foreground">{new Date().getFullYear() - supplier.yearFounded}+ years</span>
                </p>
            )}
         </div>
         <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Link href={`/supplier/${supplier.id}`}>View Profile</Link>
            </Button>
            <Button>Send RFQ <Send className="ml-2 h-4 w-4"/></Button>
        </div>
      </div>
    </div>
  );
}
