'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const Profile = () => {
  const router = useRouter();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  async function handleSignout() {
    signOut();
    router.push('/');
  }

  return (
    <div className='container my-10'>
      <p>User is Authenticated</p> <br />
      <p>{user?.username}</p>
      <Button onClick={() => handleSignout()}>Sign out</Button>
    </div>
  );
};

export default Profile;
