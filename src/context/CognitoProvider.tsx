/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

'use client';

import type { AuthUser } from 'aws-amplify/auth';
import { getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useToast } from '@/components/ui/use-toast';

type TCognitoContextProviderProps = {
  children: React.ReactNode;
};

type TLoginPayload = {
  username: string;
  password: string;
  attributes: Record<string, string>;
};
interface IContextCognito {
  isAuth: boolean;
  loading: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: AuthUser | undefined;
  setUser: Dispatch<SetStateAction<AuthUser | undefined>>;
  handleSignout: () => void;
  handleLogin: (payload: TLoginPayload) => void;
}

export const CognitoContext = createContext<IContextCognito | null>(null);

const CognitoContextProvider = ({ children }: TCognitoContextProviderProps) => {
  const { toast } = useToast();

  const [user, setUser] = useState<AuthUser>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function getAuthUser() {
    try {
      setLoading(true);
      const authUser = await getCurrentUser();
      setUser(authUser);
      setIsAuth(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthUser();
  }, []);

  async function handleSignout() {
    setIsAuth(false);
    setUser(undefined);

    await signOut();
    toast({
      title: 'Successfully Logout',
      variant: 'default',
    });

    router.push('/login');
  }

  async function handleLogin(payload: TLoginPayload) {
    try {
      const { nextStep } = await signIn(payload);
      if (nextStep?.signInStep == 'DONE') {
        await getAuthUser();
        toast({
          title: 'Successfully Login',
          variant: 'default',
        });
        router.push('/profile');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.name === 'UserNotFoundException' ||
          error.name === 'NotAuthorizedException'
        ) {
          return toast({
            title: 'Login Failed',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    }
  }

  return (
    <CognitoContext.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
        handleSignout,
        loading,
        handleLogin,
      }}
    >
      {children}
    </CognitoContext.Provider>
  );
};

export default CognitoContextProvider;
