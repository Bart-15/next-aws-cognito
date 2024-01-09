'use client';

import '@/utils/aws/Amplify';
import '@aws-amplify/ui-react/styles.css';

import { Authenticator } from '@aws-amplify/ui-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/react-query/queryClient';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        {children}
        <Toaster />
      </Authenticator.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Provider;
