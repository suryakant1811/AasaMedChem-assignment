import { z } from 'zod';

const roleSchema = z.enum(['SELLER', 'BUYER']).default('BUYER');

export const registerSchema = z.object({
  email: z.string().email('A valid email is required.'),
  name: z.string().min(2, 'Name is required.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  role: roleSchema,
});

export const loginSchema = z.object({
  email: z.string().email('A valid email is required.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});
