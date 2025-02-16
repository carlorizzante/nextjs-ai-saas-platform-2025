"use client";

import { Menu } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

type MobileSidebarProps = {
  apiUsage: number;
}

export const MobileSidebar = ({ apiUsage }: MobileSidebarProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu size={24} />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="max-w-72 p-0">
      <Sidebar apiUsage={apiUsage} />
    </SheetContent>
  </Sheet>
)
