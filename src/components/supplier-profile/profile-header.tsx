// src/components/supplier-profile/profile-header.tsx
import type { Supplier } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Send, Bookmark, BadgeCheck } from 'lucide-react';

interface ProfileHeaderProps {
  supplier: Supplier;
}

export default function ProfileHeader({ supplier }: ProfileHeaderProps) {
  const verificationBadge = supplier.verified ? (
     <Badge variant="outline" className="border-green-500 text-green-500 flex items-center gap-1.5 py-1 px-2">
        <BadgeCheck className="h-4 w-4" />
        <span>RakshaBase Verified</span>
      </Badge>
  ) : (
     <Badge variant="outline" className="border-amber-500 text-amber-500 flex items-center gap-1.5 py-1 px-2">
        <span>Self-Declared</span>
      </Badge>
  );

  return (
    <header className="pb-8 border-b border-border/60">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Left Side */}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
             <Badge variant="secondary" className="font-normal">{supplier.type}</Badge>
             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{supplier.location}</span>
            </div>
             {verificationBadge}
          </div>
          
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
            {supplier.companyName}
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground mb-6">
            {supplier.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {supplier.subcategories.map(sub => (
              <Badge key={sub} variant="outline" className="font-normal">{sub}</Badge>
            ))}
          </div>

        </div>

        {/* Right Side - Actions */}
        <div className="flex-shrink-0 flex flex-row md:flex-col gap-3">
          <Button size="lg" className="w-full md:w-auto">
            Send RFQ
            <Send className="ml-2 h-4 w-4"/>
          </Button>
          <Button size="lg" variant="outline" className="w-full md:w-auto">
            <Bookmark className="mr-2 h-4 w-4" />
            Shortlist Supplier
          </Button>
        </div>
      </div>
    </header>
  );
}
