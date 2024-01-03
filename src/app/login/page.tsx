'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import LoginForm from '@/components/auth/login/LoginForm';
import { CognitoContext } from '@/context/CognitoProvider';

const Login = () => {
  const router = useRouter();

  const cognito = useContext(CognitoContext);
  if (!cognito) throw new Error('AWS Cognito context is null');

  const { isAuth } = cognito;

  useEffect(() => {
    if (isAuth) {
      return router.push('/profile');
    }
  }, [isAuth, router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <LoginForm />
    </div>
  );
};

export default Login;
