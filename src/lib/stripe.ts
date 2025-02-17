import Stripe from 'stripe';
import { absoluteUrl } from './utils';

export const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
});

export const settingsUrl = absoluteUrl('/settings');
