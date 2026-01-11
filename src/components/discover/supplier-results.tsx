// src/components/discover/supplier-results.tsx
import { AlertCircle } from 'lucide-react';
import SupplierCard from './supplier-card';
import type { Supplier } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SupplierResultsProps {
  suppliers: Supplier[];
}

export default function SupplierResults({ suppliers }: SupplierResultsProps) {
  if (suppliers.length === 0) {
    return (
       <Alert className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Suppliers Found</AlertTitle>
          <AlertDescription>
            Try adjusting your search or filter criteria to find what you're looking for.
          </AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {suppliers.map((supplier) => (
        <SupplierCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  );
}
