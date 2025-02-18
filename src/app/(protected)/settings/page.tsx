import { Settings } from 'lucide-react';
import { Heading } from '@/components/heading';
import { SubscriptionButton } from '@/components/subscription-button';
import { checkSubscription } from '@/lib/subscription';

export default async function SettingsPage() {
  const isValidSubscription = await checkSubscription();
  const userPlantext = isValidSubscription
    ? 'You are currently on a Premium Plan.'
    : 'You are currently on a Free Plan.';


  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {userPlantext}
        </div>
        <SubscriptionButton
          isValidSubscription={isValidSubscription}
        />
      </div>
    </div>
  );
}
