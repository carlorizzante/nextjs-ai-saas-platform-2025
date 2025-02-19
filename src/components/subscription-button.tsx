"use client";

import { useState } from 'react';
import axios from 'axios';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SubscriptionButtonProps = {
  isValidSubscription: boolean;
}

export const SubscriptionButton = ({ isValidSubscription }: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;

    } catch (error: unknown) {
      console.error('BILLING ERROR', error);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      className="text-sm"
      variant={isValidSubscription ? 'default' : 'premium'}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isValidSubscription ? 'Manage Your Subscription' : "Upgrade to Premium"}
      <Zap className="w-4 h-4 fill-white" />
    </Button>
  )

}
