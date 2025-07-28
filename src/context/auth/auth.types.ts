// auth.types.ts

import type { UserSessionProps } from '@/services/users/users.props';
import type { ReactNode } from 'react';

export interface AuthContextInterface {
  user: UserSessionProps | null;
  isLoadingUser: boolean;
  login: (user: UserSessionProps) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
