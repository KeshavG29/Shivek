import { Grid, ClipboardCheck, ScanSearch, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const features = [
  {
    icon: Grid,
    title: 'Capability-Driven Discovery',
    description: 'Suppliers structured by manufacturing and service capabilities.',
  },
  {
    icon: ClipboardCheck,
    title: 'Certification-Focused Profiles',
    description: 'Visibility into standards, approvals, and compliance.',
  },
  {
    icon: ScanSearch,
    title: 'Procurement-Ready Information',
    description: 'Organized for shortlisting and evaluation.',
  },
  {
    icon: ShieldCheck,
    title: 'Defense & Aerospace Context',
    description: 'Built for domain-specific procurement workflows in mind.',
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Built specifically for defense & aerospace procurement</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-none shadow-none text-center items-center flex flex-col">
              <CardHeader className="p-0 mb-4">
                <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto">
                    <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="font-headline text-lg mb-2">{feature.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
