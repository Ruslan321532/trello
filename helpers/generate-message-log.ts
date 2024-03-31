import { ACTION, AuditLog } from '@prisma/client';

type LogMessageFunction = (log: AuditLog) => string;

const actionMessages: Record<ACTION, LogMessageFunction> = {
  [ACTION.CREATE]: ({ entityTitle, entityType }) =>
    `created ${entityType.toLowerCase()} "${entityTitle}"`,
  [ACTION.UPDATE]: ({ entityTitle, entityType }) =>
    `updated ${entityType.toLowerCase()} "${entityTitle}"`,
  [ACTION.DELETE]: ({ entityTitle, entityType }) =>
    `deleted ${entityType.toLowerCase()} "${entityTitle}"`,
};

export const generateLogMessage: LogMessageFunction = log => {
  const { action } = log;
  return (
    actionMessages[action] ||
    ((log: AuditLog) =>
      `unknown action ${log.entityType.toLowerCase()} "${log.entityTitle}"`)
  )(log);
};
