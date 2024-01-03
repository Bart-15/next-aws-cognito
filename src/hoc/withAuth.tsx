/* eslint-disable react/function-component-definition */

'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { CognitoContext } from '@/context/CognitoProvider';

interface ProtectedComponentProps {
  // Define any specific props for your wrapped component here
}
export function withAuth<P>(
  Component: React.ComponentType<P>,
): React.FC<P & ProtectedComponentProps> {
  return function ProtectedComponent(props: P & ProtectedComponentProps) {
    const router = useRouter();
    const cognito = useContext(CognitoContext);
    if (!cognito) throw new Error('AWS Cognito context is undefined');

    const { isAuth, user, loading } = cognito;

    useEffect(() => {
      const loginRedirect = async () => {
        if (!user) {
          router.push('/login');
        }
      };

      loginRedirect();
    }, [user, loading, router]);

    if (loading) {
      return <p>Loading....</p>;
    }

    return user && <Component {...props} />;
  };
}
