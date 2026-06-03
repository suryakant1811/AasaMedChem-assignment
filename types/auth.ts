import type { UserRole } from '@prisma/client';

export type AuthPayload = {
  id: string;
  email: string;
  role: UserRole;
};

export type CurrentUser = AuthPayload;
