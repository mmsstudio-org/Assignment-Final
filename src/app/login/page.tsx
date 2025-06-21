import LoginForm from '@/components/auth/LoginForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
