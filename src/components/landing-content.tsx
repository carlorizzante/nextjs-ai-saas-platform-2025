"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TESTIMONIALS } from '@/lib/constants';

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {TESTIMONIALS.map(({ name, avatar, title, description }, index) => (
          <Card key={index} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <div className="flex justify-center items-center bg-zinc-700 text-zinc-300 text-md w-12 h-12 rounded-full">{avatar}</div>
                <div>
                  <p className="text-lg">{name}</p>
                  <p className="text-sm text-zinc-400">{title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
