import Link from 'next/link';
import { Rocket, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12 text-foreground">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
              <Rocket className="h-6 w-6 text-primary" />
              <span>RakshaBase</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Verified supplier discovery for defence & aerospace procurement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline text-foreground">For Buyers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/discover" className="text-muted-foreground hover:text-foreground">Discover Suppliers</Link></li>
              <li><Link href="/discover/results" className="text-muted-foreground hover:text-foreground">Product Categories</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Certifications & Standards</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline text-foreground">For Suppliers</h4>
            <ul className="space-y-2 text-sm">
               <li><Link href="/signup" className="text-muted-foreground hover:text-foreground">List Your Company</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Supplier Dashboard</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold mb-3 font-headline text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About RakshaBase</Link></li>
              <li><Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground">How It Works</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} RakshaBase. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter size={18} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Linkedin size={18} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Github size={18} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
