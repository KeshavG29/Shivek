// src/app/discover/page.tsx
import GatewaySearch from '@/components/discover/gateway-search';
import { taxonomy } from '@/lib/dummy-data';
import CategoryBrowser from '@/components/discover/category-browser';

export default function DiscoverGatewayPage() {

  return (
    <div className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                Discover Verified Suppliers
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Search or browse by component, capability, or service to find defence-grade suppliers.
            </p>
        </div>
        <GatewaySearch />
        <CategoryBrowser taxonomy={taxonomy} />
    </div>
  );
}
