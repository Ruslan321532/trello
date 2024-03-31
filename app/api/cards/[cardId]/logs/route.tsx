import { auth } from '@clerk/nextjs';
import { ENTITY_TYPE } from '@prisma/client';
import { NextResponse } from 'next/server';

import { db } from '@/config/db';

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const auditLog = await db.auditLog.findMany({
      where: {
        orgId,
        entityID: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });

    return NextResponse.json(auditLog);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
