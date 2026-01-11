// src/components/supplier-profile/detail-section.tsx
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface DetailSectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  noBorder?: boolean;
}

export default function DetailSection({ title, icon: Icon, children, noBorder = false }: DetailSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="h-6 w-6 text-primary" />}
        <h2 className="font-headline text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className={cn(
        !noBorder && "pl-9",
      )}>
        {children}
      </div>
    </section>
  );
}
