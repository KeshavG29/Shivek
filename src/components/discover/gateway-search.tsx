// src/components/discover/gateway-search.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';

export default function GatewaySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/discover/results?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="mt-8 md:mt-12">
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            type="search"
            placeholder="e.g., Power Management ICs, Optical Bonding, MIL-STD-461 testing"
            className="w-full pl-14 pr-32 h-16 text-lg rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="lg" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full h-12 px-8">
            Search
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
}
