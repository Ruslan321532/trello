'use client';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
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

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    if (type === 'card') {
      const newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        list => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        list => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Проверяю, существуют ли карты в sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Проверяю, существуют ли карты в destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Перемещение карты в том же списке (верх вниз в той же колонке)
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });
        // Пользователь перемещает карточку в другой список
      } else {
        // Удалить карту из списка источников
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Присваиваю новый listId перемещенной карте
        movedCard.listId = destination.droppableId;

        // Добавляю карту в список направлений
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Обновление порядка для каждой карты в списке назначений.
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: destList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
