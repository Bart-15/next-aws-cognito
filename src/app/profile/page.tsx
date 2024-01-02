'use client';

import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import { CognitoContext } from '@/context/CognitoProvider';
import { withAuth } from '@/hoc/withAuth';

const Profile = () => {
  const cognito = useContext(CognitoContext);
  if (!cognito) throw new Error('AWS Cognito context is undefined');

  const { handleSignout } = cognito;

  return (
    <div className='container my-10'>
      <p>User is Authenticated</p> <br />
      <Button onClick={() => handleSignout()}>Sign out</Button>
    </div>
  );
};

export default withAuth(Profile);
