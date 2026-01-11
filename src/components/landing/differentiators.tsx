import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, FileText, Target } from 'lucide-react';

const differentiators = [
  {
    icon: BadgeCheck,
    title: 'Verified Suppliers, Guaranteed',
    description: 'Every supplier on RakshaBase undergoes a verification process. Procure with confidence knowing your partners meet stringent quality and compliance standards.',
  },
  {
    icon: FileText,
    title: 'Structured Taxonomy',
    description: 'Move beyond keyword search. Our multi-level taxonomy for products, services, and capabilities ensures you find exactly what you\'re looking for, every time.',
  },
  {
    icon: Target,
    title: 'Defense-Focused by Design',
    description: 'We are not a generic B2B marketplace. Our platform is built from the ground up to address the specific needs and nuances of the Indian defense and aerospace industry.',
  },
];

export default function Differentiators() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Why RakshaBase?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Built for precision, designed for trust. We provide an unparalleled advantage in a high-stakes industry.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <Card key={index} className="bg-background border border-border/40 shadow-sm hover:shadow-lg transition-shadow hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
