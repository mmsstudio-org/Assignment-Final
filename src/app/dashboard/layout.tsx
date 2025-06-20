import Link from 'next/link';
import { Building, Home, MessageSquare, PlusCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/auth/UserNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-background lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
              <Building className="h-6 w-6 text-primary" />
              <span>Landlord Dashboard</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="/dashboard"
              >
                <Home className="h-4 w-4" />
                My Properties
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                href="/dashboard/add-property"
              >
                <PlusCircle className="h-4 w-4" />
                Add New Property
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="#"
              >
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
               <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="#"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px]">
          <Link className="lg:hidden" href="/dashboard">
             <Building className="h-6 w-6 text-primary" />
            <span className="sr-only">Dashboard</span>
          </Link>
          <div className="w-full flex-1">
            {/* Can add a search bar here */}
          </div>
          <UserNav />
        </header>
        <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
