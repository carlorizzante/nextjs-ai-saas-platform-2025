"use client";

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { FreeCounter } from './free-counter';

const montserrat = Montserrat({
  weight: "600",
  variable: "--font-montserrat",
  subsets: ["latin"],
});

type SidebarProps = {
  apiUsage?: number;
  isPro: boolean;
}

export const Sidebar = ({ apiUsage = 0, isPro }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen py-4 gap-4 bg-[#111827] text-white">
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              src="/vercel.svg"
              alt="logo"
            />
          </div>
          <h1 className={cn(
            montserrat.className,
            'text-2xl font-bold'
          )}>Genjus AI</h1>
        </Link>
        <div className="flex flex-col gap-4">
          {ROUTES.map(({ label, href, color, ...route }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                pathname === href ? 'bg-white/10' : 'text-zinc-400',
                'flex justify-start items-center gap-4',
                'w-full p-3',
                'hover:text-white hover:bg-white/10 rounded-lg transition'
              )}
            >
              <div className="flex flex-1 items-center gap-4">
                <route.icon className={cn(
                  'w-6 h-6',
                  color
                )} />
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiUsage={apiUsage} isPro={isPro} />
    </div>
  )

}
