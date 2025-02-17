import { headers } from 'next/headers';
import Stripe from 'stripe';
import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const HEADERS = await headers();
  const signature = HEADERS.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

  } catch (error) {
    console.log('STRIPE WEBHOOK ERROR', error);
    return new Response('Stripe Webhook Error', { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription! as string);

    if (!session?.metadata?.userId) {
      return new Response('User id is required.', { status: 400 });
    }

    await prismadb.userSubscription.create({
      data: {
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer.toString(),
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    });
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription! as string);

    await prismadb.userSubscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    });
  }

  return new Response(null, { status: 200 });
}
