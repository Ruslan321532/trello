import { Board } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/helpers/create-safe-action';

import { CreateBoard } from './schema';

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;
