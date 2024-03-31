import { auth } from '@clerk/nextjs';

import { db } from '@/config/db';

const DAY_IN_M = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const Valid =
    orgSubscription.stripePriceId &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_M > Date.now();

  return !!Valid;
};
