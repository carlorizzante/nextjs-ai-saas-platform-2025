import { MAX_FREE_COUNTS } from '@/lib/constants';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';

export async function checkUserApiUsageAction() {
  const { userId } = await auth();
  if (!userId) { return; }

  const userApiUsage = await prismadb.userApiUsage.findUnique({
    where: { userId }
  });

  if (!userApiUsage || userApiUsage.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
}
