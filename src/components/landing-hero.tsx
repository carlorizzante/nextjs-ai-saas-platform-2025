"use client";

import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';
import { Button } from '@/components/ui/button';
import { TEXTWRITER_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';

export const LandingHero = () => {
  const isSignedIn = useAuth();
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className={cn('text-transparent bg-clip-text', 'bg-gradient-to-r from-purple-400 to-pink-600')}>
          <TypewriterComponent
            options={TEXTWRITER_OPTIONS}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10 times faster than ever before.
      </div>
      <div className="">
        <Link href={isSignedIn ? '/dashboard' : '/signup'}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 font-semibold rounded-full">
            Start Generating for Free!
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required for free trial. Cancel anytime.
      </div>
    </div>
  )
}
