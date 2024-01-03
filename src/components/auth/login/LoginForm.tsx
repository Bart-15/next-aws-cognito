/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CognitoContext } from '@/context/CognitoProvider';
import { LoginPayload, LoginValidation } from '@/validation/login.validation';

import { Input } from '../../ui/input';

const LoginForm = () => {
  const router = useRouter();

  const cognito = useContext(CognitoContext);
  if (!cognito) throw new Error('AWS Cognito context is null');

  const { handleLogin } = cognito;

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

  async function login(data: LoginPayload) {
    const payload = {
      username: data.email,
      password: data.password,
      attributes: {
        'custom:role': 'user',
      },
    };

    handleLogin(payload);
  }
  return (
    <Card className='w-[400px]'>
      <div className='flex flex-col justify-center'>
        <CardContent className='mb-0'>
          <p className='my-2 mt-2 text-center'>
            AWS Cognito Authentication - Login
          </p>
          <form onSubmit={handleSubmit(login)} id='login-form'>
            <div className='mb-2 space-x-2'>
              <div className='grid flex-1 gap-2'>
                <Label htmlFor='email' className='sr-only'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  {...register('email')}
                  placeholder='Email'
                />
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
                  placeholder='Password'
                />
              </div>
              {errors.password && (
                <p className='mt-2 text-xs text-red-500'>
                  {' '}
                  {errors.password?.message}{' '}
                </p>
              )}
            </div>
            <CardFooter className='flex justify-between px-0 py-2'>
              <Button form='login-form' type='submit' className='w-full'>
                Login
              </Button>
            </CardFooter>
            <p
              onClick={() => router.push('/register')}
              className='cursor-pointer text-center text-base font-bold text-blue-500 hover:underline'
            >
              Don&apos;t have an account?
            </p>
          </form>
        </CardContent>
      </div>
    </Card>
  );
};

export default LoginForm;
