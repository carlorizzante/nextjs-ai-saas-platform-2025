import { MobileSidebar } from '@/components/mobile-sidebar';
import { UserButton } from '@clerk/nextjs';

type NavbarProps = {
  apiUsage?: number;
}

export const Navbar = ({ apiUsage = 0 }: NavbarProps) => (
  <div className="flex items-center p-4">
    <MobileSidebar apiUsage={apiUsage} />
    <div className="flex w-full justify-end">
      <UserButton afterSwitchSessionUrl='/' />
    </div>
  </div>
)
