'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import RegisterForm from '@/components/auth/register/RegisterForm';
import { CognitoContext } from '@/context/CognitoProvider';

interface RegisterProps {}

// eslint-disable-next-line no-empty-pattern
const Register = ({}: RegisterProps) => {
  const cognito = useContext(CognitoContext);
  if (!cognito) throw new Error('AWS Cognito context is null');

  const router = useRouter();

  const { isAuth } = cognito;

  useEffect(() => {
    if (isAuth) {
      return router.push('/profile');
    }
  }, [isAuth, router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <RegisterForm />
    </div>
  );
};
export default Register;
