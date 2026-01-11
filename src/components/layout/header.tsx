'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Rocket, UserCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const navLinks = [
  { href: '/discover', label: 'Discover' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
];

export default function Header() {
  const { user, loading, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    return user.role === 'supplier' ? '/dashboard/supplier' : '/dashboard/buyer';
  };

  const authSection = loading ? (
    <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
  ) : user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <UserCircle className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={getDashboardLink()}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="hidden items-center gap-2 md:flex">
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">Register</Link>
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
            <Rocket className="h-6 w-6 text-primary" />
            <span>RakshaBase</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground/60 transition-colors hover:text-foreground/80">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          {authSection}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold mb-4">
                <Rocket className="h-6 w-6 text-primary" />
                <span>RakshaBase</span>
              </Link>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-foreground/80 transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                ))}
                <hr/>
                {!user && !loading && (
                   <div className="flex flex-col gap-2">
                     <Button variant="ghost" asChild>
                       <Link href="/login">Login</Link>
                     </Button>
                     <Button asChild>
                       <Link href="/signup">Register</Link>
                     </Button>
                   </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
