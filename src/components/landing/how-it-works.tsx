import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Search, Handshake, ShieldCheck } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Discover',
    description: 'Use our structured taxonomy and powerful filters to find suppliers with the exact capabilities and certifications you need.',
  },
  {
    id: 2,
    icon: Handshake,
    title: 'Connect',
    description: 'Access detailed, verified supplier profiles. Save potential partners and initiate contact through a secure, private channel.',
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'Procure',
    description: 'With verified data and a clear view of the supply chain, you can streamline your procurement process and reduce risk.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <Badge variant="outline" className="mb-2 border-primary/40 text-primary">How It Works</Badge>
          <h2 className="font-headline text-3xl md:text-4xl font-bold">A Simplified Path to Strategic Sourcing</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            From initial search to final selection, our platform streamlines every step.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card key={step.id} className="text-left border border-border/40 shadow-sm hover:shadow-lg transition-shadow bg-secondary p-2 hover:-translate-y-1">
              <CardHeader className="gap-4 flex-row items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
