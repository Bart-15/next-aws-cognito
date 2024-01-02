/* eslint-disable no-console */

'use client';

import type { AuthUser } from 'aws-amplify/auth';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

type TCognitoContextProviderProps = {
  children: React.ReactNode;
};

interface IContextCognito {
  isAuth: boolean;
  loading: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: AuthUser | undefined;
  setUser: Dispatch<SetStateAction<AuthUser | undefined>>;
  handleSignout: () => void;
}

export const CognitoContext = createContext<IContextCognito | undefined>(
  undefined,
);

const CognitoContextProvider = ({ children }: TCognitoContextProviderProps) => {
  const [user, setUser] = useState<AuthUser>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        const authUser = await getCurrentUser();
        setUser(authUser);
        setIsAuth(true);
      } catch (e) {
        console.log(e);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  async function handleSignout() {
    setIsAuth(false);
    setUser(undefined);

    await signOut();
    router.push('/login');
  }

  return (
    <CognitoContext.Provider
      value={{ isAuth, setIsAuth, user, setUser, handleSignout, loading }}
    >
      {children}
    </CognitoContext.Provider>
  );
};

export default CognitoContextProvider;
