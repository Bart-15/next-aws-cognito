/* eslint-disable react/function-component-definition */

'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { CenteredLoadingSpinner } from '@/components/ui/loaidng-spinner';

interface ProtectedComponentProps {
  // Define any specific props for your wrapped component here
}
export function withAuth<P>(
  Component: React.ComponentType<P>,
): React.FC<P & ProtectedComponentProps> {
  return function ProtectedComponent(props: P & ProtectedComponentProps) {
    const router = useRouter();

    const { authStatus } = useAuthenticator((context) => [context.authStatus]);

    useEffect(() => {
      const loginRedirect = async () => {
        if (authStatus === 'unauthenticated') {
          return router.push('/');
        }
      };

      loginRedirect();
    }, [authStatus, router]);

    if (authStatus === 'configuring') {
      return <CenteredLoadingSpinner size={75} />;
    }

    return authStatus === 'authenticated' && <Component {...props} />;
  };
}
