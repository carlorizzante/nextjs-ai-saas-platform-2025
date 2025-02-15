import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';

export async function increaseUserApiUsageAction() {
  const { userId } = await auth();
  if (!userId) { return; }

  const userApiUsage = await prismadb.userApiUsage.upsert({
    where: { userId },
    create: { userId },
    update: {
      count: { increment: 1 }
    }
  });
  return { userApiUsage, updated: true };
}
