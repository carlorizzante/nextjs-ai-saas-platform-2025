import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { WithChildren } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: WithChildren) {
  return (
    <div className="relative h-full">
      <div className={cn(
        'hidden md:fixed ',
        'w-72 h-full',
        'md:flex md:flex-col',
        'md:inset-y-0 z-[80px] bg-gray-900',
      )}>
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  )
}
