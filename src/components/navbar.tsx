import { MobileSidebar } from '@/components/mobile-sidebar';
import { UserButton } from '@clerk/nextjs';

export const Navbar = () => (
  <div className="flex justify-end items-center p-4">
    <MobileSidebar />
    <div className="flex w-full justify-end">
      <UserButton afterSwitchSessionUrl='/' />
    </div>
  </div>
)
