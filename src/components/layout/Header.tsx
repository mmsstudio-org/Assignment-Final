'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserNav } from '@/components/auth/UserNav';
import { Home, Building2 } from 'lucide-react';

export default function Header() {
  // Mock authentication state. In a real app, this would come from a session provider.
  const isAuthenticated = true;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">RentalVista</span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Home
          </Link>
          <Link href="/favorites" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Favorites
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Dashboard
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <UserNav />
          ) : (
            <div className="hidden space-x-2 md:block">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
