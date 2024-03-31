import { z } from 'zod';

import { ActionState } from '@/helpers/create-safe-action';

import { StripeRedirect } from './scheme';

export type InputType = z.infer<typeof StripeRedirect>;
export type ReturnType = ActionState<InputType, string>;
