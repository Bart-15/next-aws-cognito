'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import RegisterForm from '@/components/auth/register/RegisterForm';
import { CognitoContext } from '@/context/CognitoProvider';

interface LoginProps {}

// eslint-disable-next-line no-empty-pattern
const Login = ({}: LoginProps) => {
  const cognito = useContext(CognitoContext);
  if (!cognito) throw new Error('AWS Cognito context is undefined');

  const router = useRouter();

  const { isAuth } = cognito;

  if (isAuth) {
    return router.push('/profile');
  }

  return (
    <div>
      <RegisterForm />
    </div>
  );
};
export default Login;
