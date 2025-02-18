import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { checkUserApiUsageAction } from '@/actions/check-user-api-usage.action';
import {
  increaseUserApiUsageAction,
} from '@/actions/increase-user-api-usage.action';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(
  req: Request
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt, amount = '1', resolution = '256x256' } = body;

    if (!OPENAI_API_KEY) {
      return new NextResponse("OpenAI API Key is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const isFreeTrial = await checkUserApiUsageAction();
    const isPro = await checkSubscription();

    if (!isFreeTrial && !isPro) {
      return new NextResponse("Free trial limit reached.", { status: 403 });
    }

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      await increaseUserApiUsageAction();
    }

    return NextResponse.json({ urls: response.data });

  } catch (error) {
    console.error('IMAGE GENERATION ERROR', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
