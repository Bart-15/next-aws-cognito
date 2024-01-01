'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { signUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { LoginPayload, LoginValidation } from '@/validation/login.validation';

import { Input } from '../../ui/input';
import ConfirmSignupForm from './ConfirmSignupForm';

const RegisterForm = () => {
  const router = useRouter();

  // State for confirmation code
  const [confirmSignup, setConfirmSignup] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    mode: 'all',
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleRegister(data: LoginPayload) {
    const payload = {
      username: data.email,
      password: data.password,
      attributes: {
        'custom:role': 'user',
      },
    };

    try {
      const { userId, nextStep } = await signUp(payload);

      const checkStep = nextStep.signUpStep;

      switch (checkStep) {
        case 'DONE':
          router.push('/');
          break;
        case 'CONFIRM_SIGN_UP':
          setUsername(userId as string);
          setConfirmSignup(true);
          break;
        default:
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
  return (
    <div className='container'>
      {confirmSignup ? (
        <ConfirmSignupForm username={username} />
      ) : (
        <>
          <p className='my-2 text-center'>
            AWS Cognito Authentication - Register
          </p>
          <form onSubmit={handleSubmit(handleRegister)} id='register-form'>
            <div className='mb-2 space-x-2'>
              <div className='grid flex-1 gap-2'>
                <Label htmlFor='email' className='sr-only'>
                  Email
                </Label>
                <Input id='email' type='email' {...register('email')} />
              </div>
              {errors.email && (
                <p className='mt-2 text-xs text-red-500'>
                  {' '}
                  {errors.email?.message}{' '}
                </p>
              )}
            </div>
            <div className='mb-2 space-x-2'>
              <div className='grid flex-1 gap-2'>
                <Label htmlFor='password' className='sr-only'>
                  Password
                </Label>
                <Input
                  id='password'
                  type='password'
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className='mt-2 text-xs text-red-500'>
                  {' '}
                  {errors.password?.message}{' '}
                </p>
              )}
            </div>
            <Button form='register-form' type='submit'>
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
