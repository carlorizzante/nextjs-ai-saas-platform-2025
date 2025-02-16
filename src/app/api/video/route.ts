import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { checkUserApiUsageAction } from '@/actions/check-user-api-usage.action';
import {
  increaseUserApiUsageAction,
} from '@/actions/increase-user-api-usage.action';
import { auth } from '@clerk/nextjs/server';

const REPLICATION_KEY = process.env.OPENAI_API_KEY!;
const replicate = new Replicate({
  auth: REPLICATION_KEY || '',
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt } = body;

    if (!REPLICATION_KEY) {
      return new NextResponse("REPLICATION_KEY API Key is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt are required", { status: 400 });
    }

    const isFreeTrial = await checkUserApiUsageAction();
    if (!isFreeTrial) {
      return new NextResponse("Free trial limit reached.", { status: 403 });
    }

    const output = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          // alpha: 0.5,
          prompt_a: prompt,
          // prompt_b: "90's rap",
          // denoising: 0.75,
          // seed_image_id: "vibes",
          // num_inference_steps: 50
        }
      }
    );

    await increaseUserApiUsageAction();
    return NextResponse.json({ audio: output });

  } catch (error) {
    console.error('MUSIC GENERATION ERROR', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
