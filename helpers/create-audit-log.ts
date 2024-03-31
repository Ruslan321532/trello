import { auth, currentUser } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/config/db';

interface Props {
  entityID: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error('user not found');
    }

    const { entityID, entityType, entityTitle, action } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityID,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + ' ' + user?.lastName,
      },
    });
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
