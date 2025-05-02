import { createContext, useContext } from 'react';

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {}
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};