"use client";

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI!</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Chat withe the smartest AI and experience its mind bending reasoning capabilities.</p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {ROUTES.map(({ label, color, bgColor, href, ...tool }) => (
          <Card
            key={href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            onClick={() => router.push(href)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn(
                'p-2 w-fit rounded-md',
                bgColor
              )}>
                <tool.icon className={cn('w-8 h-8', color)} />
              </div>
              <div className="font-semibold">{label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
