'use client'

// Dependencies
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';

// Types
import type { AuthContextInterface, AuthProviderProps } from './auth.types'
import type { UserSessionProps } from '@/services/users/users.props'

// Services
import { LoginUser, ValidateUserToken } from '@/services/auth'

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  isLoadingUser: true,
  login: () => { },
  logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [ user, setUser ] = useState<UserSessionProps | null>(null);
  console.log('user', user);
  const [ isLoadingUser, setIsLoadingUser ] = useState<boolean>(true);
  const router = useRouter();

  // Set and manage cookies
  const handleSetCookie = useCallback((name: string, data: string) => {
    setCookie(name, data, {
      secure: true,
      httpOnly: false,
    });
  }, []);

  const saveSessionCookies = useCallback((user: UserSessionProps) => {
    setUser(user);
    if (user.access_token) {
      handleSetCookie(`${process.env.TAG_COOKIE_TOKEN}`, user.access_token);
    }
    handleSetCookie(`${process.env.TAG_COOKIE_USER}`, JSON.stringify(user.user));
  }, [handleSetCookie]);

  const logout = useCallback(() => {
    setUser(null);
    deleteCookie(`${process.env.TAG_COOKIE_USER}`);
    deleteCookie(`${process.env.TAG_COOKIE_TOKEN}`);
    router.push('/');
  }, [router]);

  const login = useCallback((user: UserSessionProps) => {
    console.log(user);
    saveSessionCookies(user);
    setIsLoadingUser(false);
    router.push('/plataform');
  }, [saveSessionCookies, router]);

  useEffect(() => {
    const validateSession = async () => {
      const tokenCookie = getCookie(`${process.env.TAG_COOKIE_TOKEN}`)

      if (tokenCookie) {
        try {
          await ValidateUserToken({ token: String(tokenCookie) })
          const userData = await LoginUser({ token: String(tokenCookie) })
          saveSessionCookies(userData)
        } catch (error) {
          logout()
        }
      }
      setIsLoadingUser(false)
    }

    validateSession()
  }, [logout, saveSessionCookies])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
