'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';

import { useCardModal } from '@/hooks/use-card-modal';

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate py-2 px-3 text-sm bg-white rounded-md shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-purple-500"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
