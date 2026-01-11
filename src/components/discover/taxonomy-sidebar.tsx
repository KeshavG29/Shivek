// src/components/discover/taxonomy-sidebar.tsx
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Taxonomy } from '@/lib/types';

interface TaxonomySidebarProps {
  taxonomy: Taxonomy;
  selectedCategories: string[];
  onCategoryChange: (category: string, isChecked: boolean) => void;
}

export default function TaxonomySidebar({ taxonomy, selectedCategories, onCategoryChange }: TaxonomySidebarProps) {
  return (
    <div className="sticky top-20">
      <h3 className="font-headline text-lg font-semibold mb-4">Filter by Category</h3>
      <Accordion type="multiple" className="w-full" defaultValue={Object.keys(taxonomy)}>
        {Object.entries(taxonomy).map(([majorCategory, subcategories]) => (
          <AccordionItem value={majorCategory} key={majorCategory}>
            <AccordionTrigger className="font-semibold text-base">{majorCategory}</AccordionTrigger>
            <AccordionContent>
                <ul className="space-y-2 pl-4">
                {Object.keys(subcategories).map((subcategory) => (
                    <li key={subcategory} className="flex items-center space-x-2">
                        <Checkbox 
                        id={subcategory} 
                        checked={selectedCategories.includes(subcategory)}
                        onCheckedChange={(checked) => onCategoryChange(subcategory, !!checked)}
                        />
                    <Label htmlFor={subcategory} className="font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                        {subcategory}
                    </Label>
                    </li>
                ))}
                </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
