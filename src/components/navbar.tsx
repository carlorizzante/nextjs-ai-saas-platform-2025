import { MobileSidebar } from '@/components/mobile-sidebar';
import { UserButton } from '@clerk/nextjs';

type NavbarProps = {
  apiUsage?: number;
  isPro?: boolean;
}

export const Navbar = ({ apiUsage = 0, isPro = false }: NavbarProps) => (
  <div className="flex items-center p-4">
    <MobileSidebar apiUsage={apiUsage} isPro={isPro} />
    <div className="flex w-full justify-end">
      <UserButton afterSwitchSessionUrl='/' />
    </div>
  </div>
)
