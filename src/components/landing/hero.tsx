import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center text-foreground bg-background">
       <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="relative z-10 container mx-auto px-4 text-center py-20 md:py-32">
        <Badge variant="outline" className="mb-4 text-primary border-primary/50">
          India's Defence & Aerospace Supplier Network
        </Badge>
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto">
          Verified Supplier Directory for Defence & Aerospace
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Find Trusted, Certified Suppliers across India for mission-critical procurement.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/discover">
              Explore Suppliers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/signup">
              List Your Company
              <Check className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
