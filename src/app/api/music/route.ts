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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          // fps: 24,
          // model: "xl",
          // width: 1024,
          // height: 576,
          prompt,
          // batch_size: 1,
          // num_frames: 24,
          // init_weight: 0.5,
          // guidance_scale: 17.5,
          // negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken",
          // remove_watermark: false,
          // num_inference_steps: 50
        }
      }
    );

    await increaseUserApiUsageAction();
    return NextResponse.json({ audio: output });

  } catch (error) {
    console.error('VIDEO GENERATION ERROR', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
