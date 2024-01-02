'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import LoginForm from '@/components/auth/login/LoginForm';
import { CognitoContext } from '@/context/CognitoProvider';

const Login = () => {
  const router = useRouter();
  const cognito = useContext(CognitoContext);
  if (!cognito) throw new Error('AWS Cognito context is undefined');

  const { isAuth } = cognito;

  if (isAuth) {
    return router.replace('/profile');
  }

  return <LoginForm />;
};

export default Login;
