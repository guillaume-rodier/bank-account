import { UserRole, User } from '@prisma/client'; // ou string si pas d'enum

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: UserRole | 'USER' | 'GUEST' | 'ADMIN' | 'ROOT';
      };
      targetUser?: User;
    }
  }
}
