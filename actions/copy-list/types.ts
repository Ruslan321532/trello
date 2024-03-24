import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-action';

import { CopyList } from './scheme';

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;
