import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Illustration from './illustration';

const buyerPoints = [
    'Access to network of Trusted Suppliers',
    'Filter by Location, Categories and Certifications',
    'Reduce Supplier Evaluation Time',
    'Sent RFQ Anonymously and Get-Quotation',
]

const supplierPoints = [
    'Get Discovered by Procurement Professionals',
    'Showcase Certifications and Capabilities',
    'Improve Procurement Visibility',
    'Participate in Reverse-Auction',
]

export default function BuyerSupplier() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 space-y-20">
        
        {/* For Buyers */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <span className="text-sm font-bold text-primary py-1 px-3 rounded-full bg-primary/10">For Buyers</span>
            <h3 className="font-headline text-2xl md:text-3xl font-bold mt-4 mb-6">Defence & Aerospace Procurement Professionals</h3>
            <ul className="space-y-3 mb-8">
              {buyerPoints.map((point, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" asChild>
              <Link href="/discover">
                Search For Suppliers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-video flex items-center justify-center">
            <Illustration />
          </div>
        </div>

        {/* For Suppliers */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative aspect-video md:order-2 flex items-center justify-center">
                <Illustration />
            </div>
          <div className="md:order-1">
            <span className="text-sm font-bold text-primary py-1 px-3 rounded-full bg-primary/10">For Suppliers</span>
            <h3 className="font-headline text-2xl md:text-3xl font-bold mt-4 mb-6">Manufacturers & Service Providers in Defense & Aerospace</h3>
            <ul className="space-y-3 mb-8">
              {supplierPoints.map((point, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" asChild>
              <Link href="/signup">
                List Your Company
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
