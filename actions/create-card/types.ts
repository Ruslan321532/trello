import { Card } from '@prisma/client';
import { z } from 'zod';

import { ActionState } from '@/helpers/create-safe-action';

import { CreateCard } from './scheme';

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
