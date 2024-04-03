import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { ActivityItem } from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/config/db';

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const auditlogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
  });
  return (
    <ol className="space-y-4 mt-4">
      {auditlogs.length === 0 && (
        <>
          <div className="flex items-center justify-center">
            <Image
              src="/emptyState/activity-empty-state.jpg"
              alt="empty state"
              width={250}
              height={250}
              className="object-contain"
            />
          </div>
          <p className="hidden last:block text-xs text-center text-muted-foreground">
            No activity found inside this organization
          </p>
        </>
      )}
      {auditlogs.map(log => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};
