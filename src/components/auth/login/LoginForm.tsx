'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { LoginPayload, LoginValidation } from '@/validation/login.validation';

import { Input } from '../../ui/input';

const LoginForm = () => {
  const router = useRouter();

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

  async function handleLogin(data: LoginPayload) {
    const payload = {
      username: data.email,
      password: data.password,
      attributes: {
        'custom:role': 'user',
      },
    };

    try {
      const { nextStep } = await signIn(payload);
      console.log(nextStep);
      if (nextStep?.signInStep == 'DONE') router.push('/profile');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
  return (
    <div className='container'>
      <p className='my-2 text-center'>AWS Cognito Authentication - Login</p>
      <form onSubmit={handleSubmit(handleLogin)} id='login-form'>
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
            <Input id='password' type='password' {...register('password')} />
          </div>
          {errors.password && (
            <p className='mt-2 text-xs text-red-500'>
              {' '}
              {errors.password?.message}{' '}
            </p>
          )}
        </div>
        <Button form='login-form' type='submit'>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
