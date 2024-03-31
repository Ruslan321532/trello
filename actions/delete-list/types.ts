import { List } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/helpers/create-safe-action';

import { DeleteList } from './scheme';

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;
