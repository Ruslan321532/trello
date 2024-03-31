import { Card } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/helpers/create-safe-action';

import { CopyCard } from './scheme';

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>;
