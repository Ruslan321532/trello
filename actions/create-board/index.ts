'use server';

import { auth } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { db } from '@/config/db';
import { createAuditLog } from '@/helpers/create-audit-log';
import { createSafeAction } from '@/helpers/create-safe-action';
import { hasAvailableCount } from '@/helpers/org-limit';

import { CreateBoard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'not authorider',
    };
  }

  const cancelCreate = await hasAvailableCount();

  if (cancelCreate) {
    return {
      error: 'your limit  off the free boards.',
    };
  }
  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|');

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: 'Missing fields. Failed to create board.',
    };
  }
  console.log({
    image,
    imageFullUrl,
    imageId,
    imageLinkHTML,
    imageThumbUrl,
    imageUserName,
  });
  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageFullUrl,
        imageUserName,
        imageThumbUrl,
        imageLinkHTML,
      },
    });
    await createAuditLog({
      entityTitle: board.title,
      entityID: board.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: 'di naxui',
    };
  }

  revalidatePath(`board/${board.id}`);

  return { data: board };
};
export const createBoard = createSafeAction(CreateBoard, handler);
