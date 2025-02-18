import {
  getUserApiUsageAction,
} from '@/actions/get-user-api-usage.action copy';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { checkSubscription } from '@/lib/subscription';
import { WithChildren } from '@/lib/types';
import { cn } from '@/lib/utils';

export default async function DashboardLayout({ children }: WithChildren) {
  const apiUsage = await getUserApiUsageAction();
  const isPro = await checkSubscription();

  return (
    <div className="relative h-full">
      <div className={cn(
        'hidden md:fixed',
        'w-72 h-full',
        'md:flex md:flex-col',
        'md:inset-y-0 bg-gray-900',
      )}>
        <Sidebar apiUsage={apiUsage} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar apiUsage={apiUsage} isPro={isPro} />
        {children}
      </main>
    </div>
  )
}
