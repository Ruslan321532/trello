'use client';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { updateCardOrder } from '@/actions/update-card-order';
import { updateListOrder } from '@/actions/update-list-order';
import { useAction } from '@/hooks/use-action';
import { ListWithCards } from '@/types/list-board';

import { ListForm } from './list-form';
import { ListItem } from './list-item';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('List reordered');
    },
    onError: error => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success('Card reordered');
    },
    onError: error => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const handleListDrop = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    const reorderedLists = reorderList(
      orderedData,
      source.index,
      destination.index
    );
    setOrderedData(reorderedLists);
    executeUpdateListOrder({ items: reorderedLists, boardId });
  };

  const handleCardDrop = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const newOrderedData = [...orderedData];
    const sourceListIndex = newOrderedData.findIndex(
      list => list.id === source.droppableId
    );
    const destListIndex = newOrderedData.findIndex(
      list => list.id === destination.droppableId
    );

    if (sourceListIndex === -1 || destListIndex === -1) {
      return;
    }

    const sourceList = newOrderedData[sourceListIndex];
    const destList = newOrderedData[destListIndex];

    const movedCard = sourceList.cards.splice(source.index, 1)[0];
    movedCard.listId = destList.id;
    destList.cards.splice(destination.index, 0, movedCard);

    const updateCardOrders = (list: ListWithCards) => {
      list.cards.forEach((card, index) => {
        card.order = index;
      });
    };

    updateCardOrders(sourceList);
    updateCardOrders(destList);

    setOrderedData(newOrderedData);
    executeUpdateCardOrder({
      boardId,
      items: newOrderedData[destListIndex].cards,
    });
  };

  const reorderList = (
    list: ListWithCards[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, index) => ({ ...item, order: index }));
  };

  return (
    <DragDropContext
      onDragEnd={(result: DropResult) => {
        if (result.type === 'list') {
          handleListDrop(result);
        } else if (result.type === 'card') {
          handleCardDrop(result);
        }
      }}
    >
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
