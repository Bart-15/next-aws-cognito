'use client';

import '@/utils/aws/Amplify';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import CognitoContextProvider from '@/context/CognitoProvider';
import { queryClient } from '@/react-query/queryClient';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <CognitoContextProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CognitoContextProvider>
  );
}

export default Provider;
