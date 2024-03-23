'use server';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';

import { CreateBoard } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'not authorider',
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
  } catch (error) {
    return {
      error: 'di naxui',
    };
  }

  revalidatePath(`board/${board.id}`);

  return { data: board };
};
export const createBoard = createSafeAction(CreateBoard, handler);
