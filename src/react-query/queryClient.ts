/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */

import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

function queryErrHandler(error: unknown) {
  if (error instanceof AxiosError) {
    const errMsg = error.message ? error.message : 'Error connecting to server';

    // Inesrt logic here for error handling
  }
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 2 * (60 * 1000), // 2 mins, it depends
      },
      mutations: {
        onError: queryErrHandler,
      },
    },
  }); // soon, will edit the global config
}

export const queryClient = generateQueryClient();
