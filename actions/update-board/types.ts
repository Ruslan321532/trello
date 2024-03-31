import { Board } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/helpers/create-safe-action';

import { UpdateBoard } from './scheme';

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>;
