'use client';

import { AuditLog } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/helpers/fetcher';
import { useCardModal } from '@/hooks/use-card-modal';
import { CardWithList } from '@/types/list-board';

import { Dialog, DialogContent } from '../../ui/dialog';
import { Actions } from './actions';
import { Activity } from './activity';
import { Description } from './description';
import { Header } from './header';

export const CardModal = () => {
  const id = useCardModal(state => state.id);
  const isOpen = useCardModal(state => state.isOpen);
  const isClose = useCardModal(state => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: auditLog } = useQuery<AuditLog[]>({
    queryKey: ['card-logs', id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });
  return (
    <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!auditLog ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLog} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
