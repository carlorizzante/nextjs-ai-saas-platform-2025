import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import {
  settingsUrl,
  stripe,
} from '@/lib/stripe';
import {
  auth,
  currentUser,
} from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Genjus Pro AI Subscription',
              description: 'Unlimited AI usage',
            },
            unit_amount: 1999,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        }
      ],
      metadata: { userId }
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));

  } catch (error) {
    console.error('LIB > STRIPE > GET', error);
  }
}
