import { createContext } from 'react';

interface AuthContextInterface {
  isLoggedIn: boolean;
  userId: string | null;
  token: string | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  userId: '',
  token: '',
  login: () => {},
  logout: () => {},
});
