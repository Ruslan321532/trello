import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db } from '@/config/db';

import { ListContainer } from './_components/board-list-container';

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'desc',
        },
      },
    },
    orderBy: {
      order: 'desc',
    },
  });
  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer data={lists} boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
