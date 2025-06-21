import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserNav } from '@/components/auth/UserNav';
import { Building2 } from 'lucide-react';
import { auth } from '@/lib/auth';

export default async function Header() {
  const session = await auth();

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
          {session?.user?.role === 'landlord' && (
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
