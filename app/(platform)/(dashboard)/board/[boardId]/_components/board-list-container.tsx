'use client';

import { useState } from 'react';

import { ListWithCards } from '@/types/list-board';

import { ListForm } from './list-form';
import { ListItem } from './list-item';

interface BoardListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data }: BoardListContainerProps) => {
  const [orderedData] = useState(data);
  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
};
