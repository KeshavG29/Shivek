import { XCircle, CheckCircle } from 'lucide-react';

const painPoints = [
  "Finding niche, certified suppliers is time-consuming.",
  "Supplier verification is a constant, manual effort.",
  "Lack of structured data makes comparison difficult.",
  "Opaque supply chains introduce significant risk.",
];

const solutions = [
  "Structured, taxonomy-based search for precise discovery.",
  "Pre-verified profiles with certification tracking.",
  "Standardized data for easy, like-for-like evaluation.",
  "A focused, defense-grade network for India.",
];

export default function ProblemStatement() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">The Challenge of Defense Procurement</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            In a sector where precision and trust are non-negotiable, the procurement process is fraught with inefficiencies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-background p-6 rounded-lg border border-border/40">
            <h3 className="font-headline text-xl font-semibold mb-4 text-destructive/80">Current Pain Points</h3>
            <ul className="space-y-3">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-5 w-5 text-destructive/80 mr-3 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h3 className="font-headline text-xl font-semibold mb-4 text-primary">The RakshaBase Solution</h3>
            <ul className="space-y-3">
              {solutions.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
