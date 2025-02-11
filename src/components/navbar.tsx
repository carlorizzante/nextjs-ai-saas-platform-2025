import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export const Navbar = () => (
  <div className="flex justify-end items-center p-4 bg-slate-500">
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu size={24} />
    </Button>
    <div className="flex w-full justify-end">
      <UserButton afterSwitchSessionUrl='/' />
    </div>
  </div>
)
