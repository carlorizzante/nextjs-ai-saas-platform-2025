"use client";

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';

const font = Montserrat({
  weight: '600',
  subsets: ["latin"],
});

export const LandingNavbar = () => {
  const isSignedIn = useAuth();

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-4">
        <div className="relative w-8 h-4">
          <Image
            src="/vercel.svg"
            alt="logo"
            fill
          />
        </div>
        <h1
          className={cn(
            font.className,
            'text-2xl font-bold text-white'
          )}
        >Genjus AI</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant="outline" className="rounded-full">
            Get Started!
          </Button>
        </Link>
      </div>
    </nav>
  );
}
