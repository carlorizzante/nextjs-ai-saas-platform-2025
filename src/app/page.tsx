import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <Link href="/auth/sign-in">
        <Button>Login</Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button>Register</Button>
      </Link>
    </div>
  );
}
