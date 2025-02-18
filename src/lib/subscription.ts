import { auth } from '@clerk/nextjs/server';
import prismadb from './prismadb';

const DAY_IN_MS = 86_400_400;

export const checkSubscription = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    }
  });

  if (!userSubscription) {
    return false;
  }

  const isValidSubscription = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd && userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValidSubscription;
}
