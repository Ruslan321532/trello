import { db } from '@/lib/db';

import { Board } from './board';
import { Form } from './form';

const OrganizationPage = async () => {
  const boardsblock = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div>
        {boardsblock.map(board => (
          <Board title={board.title} key={board.id} id={board.id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
