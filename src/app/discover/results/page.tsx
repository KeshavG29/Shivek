// src/app/discover/results/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight } from 'lucide-react';
import TaxonomySidebar from '@/components/discover/taxonomy-sidebar';
import SupplierResults from '@/components/discover/supplier-results';
import FilterPanel from '@/components/discover/filter-panel';
import { suppliers, taxonomy, filterOptions, getMajorCategory, getSubcategoriesOfMajor } from '@/lib/dummy-data';
import type { Supplier } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export default function DiscoverResultsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    certifications: [],
    industries: [],
    locations: [],
    supplierTypes: [],
    verificationStatus: [],
  });

  const initialCategory = useMemo(() => searchParams.get('category'), [searchParams]);

  const currentMajorCategory = useMemo(() => {
    if (!initialCategory) return null;
    return getMajorCategory(initialCategory);
  }, [initialCategory]);

  const relatedSubcategories = useMemo(() => {
    if (!currentMajorCategory) return [];
    return getSubcategoriesOfMajor(currentMajorCategory);
  }, [currentMajorCategory]);


  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const searchInput = searchTerm.toLowerCase();
      const matchesSearch = searchTerm
        ? supplier.companyName.toLowerCase().includes(searchInput) ||
          supplier.description.toLowerCase().includes(searchInput) ||
          supplier.capabilities.some(cap => cap.toLowerCase().includes(searchInput))
        : true;

      const effectiveCategories = selectedCategories.length > 0 ? selectedCategories : (initialCategory ? [initialCategory] : []);
      
      const matchesCategory = effectiveCategories.length > 0
        ? effectiveCategories.some(cat => supplier.subcategories.includes(cat))
        : true;
      
      const matchesFilters = Object.entries(activeFilters).every(([filterType, filterValues]) => {
          if (filterValues.length === 0) return true;
          if (filterType === 'certifications') {
              return filterValues.every(val => supplier.certifications.includes(val));
          }
          if (filterType === 'industries') {
              return filterValues.some(val => supplier.industries.includes(val));
          }
          if (filterType === 'locations') {
              return supplier.location.split(',')[0] === filterValues[0];
          }
          if (filterType === 'supplierTypes') {
              return filterValues.includes(supplier.type);
          }
          if (filterType === 'verificationStatus') {
              const status = supplier.verified ? 'RakshaBase Verified' : 'Self-Declared';
              return filterValues.includes(status);
          }
          return true;
      });

      return matchesSearch && matchesCategory && matchesFilters;
    });
  }, [searchTerm, selectedCategories, activeFilters, initialCategory]);


  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
        params.set('q', term);
    } else {
        params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    setActiveFilters(prev => {
        const currentValues = prev[filterType] || [];
        const newValues = isChecked 
            ? [...currentValues, value]
            : currentValues.filter(v => v !== value);
        return { ...prev, [filterType]: newValues };
    });
  };

  const handleCategoryChange = (category: string, isChecked: boolean) => {
      setSelectedCategories(prev => 
          isChecked ? [...prev, category] : prev.filter(c => c !== category)
      );
  }

  const resetFilters = () => {
      setActiveFilters({
        certifications: [],
        industries: [],
        locations: [],
        supplierTypes: [],
        verificationStatus: [],
      });
      setSelectedCategories([]);
      setSearchTerm('');
      router.push('/discover/results', { scroll: false });
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category'); // Start with a clean slate
    if (selectedCategories.length > 0) {
      // For simplicity, we only reflect the first selected category in the URL as primary.
      // The filtering logic in `filteredSuppliers` already handles multiple selections from state.
      params.set('category', selectedCategories[0]);
    } else if (initialCategory && selectedCategories.length === 0) {
      // If we've deselected everything, but an initial category was present, keep it in URL
      params.set('category', initialCategory);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, pathname, router]);

  useEffect(() => {
    // Sync state with URL on initial load or back/forward navigation
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && !selectedCategories.includes(categoryFromUrl)) {
        setSelectedCategories([categoryFromUrl]);
    } else if (!categoryFromUrl && selectedCategories.length > 0 && searchTerm === '') {
        setSelectedCategories([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
         <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/discover" className="hover:text-foreground">Discover Suppliers</Link>
          {currentMajorCategory && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground">{currentMajorCategory}</span>
              </>
          )}
           {initialCategory && !currentMajorCategory && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground">Results</span>
              </>
          )}
          {initialCategory && currentMajorCategory && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground font-medium">{initialCategory}</span>
              </>
          )}
        </div>
        <h1 className="font-headline text-4xl font-bold text-foreground">
          {initialCategory ? `Suppliers – ${initialCategory}` : "Discover Verified Suppliers"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Verified and emerging suppliers supporting defense and aerospace programs.
        </p>

        {relatedSubcategories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground mr-2">Related Categories:</span>
                {relatedSubcategories.map(subCat => (
                    <Link key={subCat} href={`/discover/results?category=${encodeURIComponent(subCat)}`}>
                         <Badge
                            variant={initialCategory === subCat ? 'default' : 'secondary'}
                            className="cursor-pointer"
                        >
                            {subCat}
                        </Badge>
                    </Link>
                ))}
            </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter results..."
              className="pl-10 h-11 text-base"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <TaxonomySidebar 
            taxonomy={taxonomy} 
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            />
        </aside>

        <main className="md:col-span-3">
          <FilterPanel 
            options={filterOptions} 
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
            />
          <SupplierResults suppliers={filteredSuppliers} />
        </main>
      </div>
    </div>
  );
}
