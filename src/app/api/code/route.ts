import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { checkUserApiUsageAction } from '@/actions/check-user-api-usage.action';
import {
  increaseUserApiUsageAction,
} from '@/actions/increase-user-api-usage.action';
import { auth } from '@clerk/nextjs/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: "You are a code generator. You answer exclusively in markdown code snippets. You can use code comments for explanation.",
}

export async function POST(
  req: Request
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!OPENAI_API_KEY) {
      return new NextResponse("OpenAI API Key is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = checkUserApiUsageAction();
    if (!freeTrial) {
      return new NextResponse("Free trial limit reached.", { status: 403 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [instructionMessage, ...messages],
      // store: true,
    });

    await increaseUserApiUsageAction();
    return NextResponse.json({ message: completion.choices[0].message });

  } catch (error) {
    console.error('CODE GENERATION ERROR', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
