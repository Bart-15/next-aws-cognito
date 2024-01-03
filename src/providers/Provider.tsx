'use client';

import '@/utils/aws/Amplify';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/ui/toaster';
import CognitoContextProvider from '@/context/CognitoProvider';
import { queryClient } from '@/react-query/queryClient';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CognitoContextProvider>{children}</CognitoContextProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Provider;
