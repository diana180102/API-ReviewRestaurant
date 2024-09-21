// data user ( tipos o interfaces para datos de usuario)

import { z } from 'zod';

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export const UserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(255),
  role: z.enum(['admin', 'user']).default('user'),
});

export type UserInput = z.infer<typeof UserSchema>;