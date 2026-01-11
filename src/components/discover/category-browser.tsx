// src/components/discover/category-browser.tsx
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { Taxonomy } from '@/lib/types';

interface CategoryBrowserProps {
  taxonomy: Taxonomy;
}

export default function CategoryBrowser({ taxonomy }: CategoryBrowserProps) {
  return (
    <div className="mt-12 md:mt-16">
      <h3 className="text-xl font-semibold text-center text-foreground mb-8">Or browse by category</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(taxonomy).map(([majorCategory, subcategories]) => (
          <Card key={majorCategory} className="bg-secondary/50 p-6 flex flex-col">
            <h4 className="font-headline text-lg font-semibold text-foreground mb-4">{majorCategory}</h4>
            <div className="flex-grow flex flex-col items-start space-y-2">
              {Object.keys(subcategories).map(subcategory => (
                <Link
                  key={subcategory}
                  href={`/discover/results?category=${encodeURIComponent(subcategory)}`}
                  className="text-muted-foreground hover:text-primary hover:underline transition-colors text-sm py-0.5"
                >
                  {subcategory}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
