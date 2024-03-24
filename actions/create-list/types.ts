import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-action';

import { CreateList } from './scheme';

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;
