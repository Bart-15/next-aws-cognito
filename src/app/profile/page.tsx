'use client';

import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { Button } from '@/components/ui/button';

const Profile = ({ signOut, user }: WithAuthenticatorProps) => (
  <div className='container my-10'>
    <p>User is Authenticated</p> <br />
    <p>{user?.username}</p>
    <Button onClick={signOut}>Sign out</Button>
  </div>
);

export default withAuthenticator(Profile);
