import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';

export async function getUserApiUsageAction() {
  const { userId } = await auth();
  if (!userId) { return; }

  const userApiUsage = await prismadb.userApiUsage.findUnique({
    where: { userId }
  });

  return userApiUsage?.count || 0;
}
