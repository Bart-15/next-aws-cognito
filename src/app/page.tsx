'use client';

import { useAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const Home = () => {
  const router = useRouter();

  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <h1 className='text-2xl'>User is Authenticated</h1>
      <p>Username: {user?.username}</p>
      <hr />

      <Button onClick={() => router.push('/profile')}>Profile page</Button>
    </main>
  );
};

export default withAuthenticator(Home);
