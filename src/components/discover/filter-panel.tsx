// src/components/discover/filter-panel.tsx
'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronDown, Filter, X } from 'lucide-react';
import type { FilterOptions } from '@/lib/types';

interface FilterPanelProps {
  options: FilterOptions;
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, value: string, isChecked: boolean) => void;
  onReset: () => void;
}

const filterLabels: Record<string, string> = {
    certifications: "Certifications",
    industries: "Industry Served",
    locations: "Location",
    supplierTypes: "Supplier Type",
    verificationStatus: "Verification Status",
}

export default function FilterPanel({ options, activeFilters, onFilterChange, onReset }: FilterPanelProps) {
    
  const totalActiveFilters = Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div className="bg-secondary/50 rounded-lg p-4 mb-6 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <span className="font-semibold">Filters:</span>
      </div>

      {Object.entries(options).map(([key, values]) => (
        <Popover key={key}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-background">
              {filterLabels[key]}
              {activeFilters[key] && activeFilters[key].length > 0 && 
                <span className="ml-2 bg-primary text-primary-foreground h-5 w-5 text-xs rounded-full flex items-center justify-center">{activeFilters[key].length}</span>
              }
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 max-h-80 overflow-y-auto">
            <div className="grid gap-4">
              <h4 className="font-medium leading-none">{filterLabels[key]}</h4>
              <div className="space-y-2">
                {values.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${key}-${value}`}
                      checked={activeFilters[key]?.includes(value)}
                      onCheckedChange={(checked) => onFilterChange(key, value, !!checked)}
                    />
                    <Label htmlFor={`${key}-${value}`} className="font-normal cursor-pointer">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ))}

        {totalActiveFilters > 0 && (
            <Button variant="ghost" onClick={onReset} className="text-muted-foreground hover:text-foreground">
                <X className="mr-2 h-4 w-4" />
                Reset Filters
            </Button>
        )}
    </div>
  );
}
