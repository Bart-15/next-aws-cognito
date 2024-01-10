'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { withAuth } from '@/hoc/withAuth';

const Profile = () => {
  const router = useRouter();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  async function handleSignout() {
    signOut();
    router.push('/');
  }

  return (
    <div className='container my-10'>
      <Button onClick={() => router.back()} className='mb-3'>
        Go back
      </Button>
      <p>User is Authenticated</p>
      <p>User name: {user?.username}</p>
      <hr className='my-2' />
      <Button onClick={() => handleSignout()} className='mb-3'>
        Sign out
      </Button>
    </div>
  );
};

export default withAuth(Profile);
