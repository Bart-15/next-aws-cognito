import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ConfirmPassPayload,
  ConfirmSignupFormValidation,
} from '@/validation/login.validation';

interface ConfirmSignupFormProps {
  username: string;
}

const ConfirmSignupForm = ({ username }: ConfirmSignupFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmPassPayload>({
    mode: 'all',
    resolver: zodResolver(ConfirmSignupFormValidation),
    defaultValues: {
      confirmationCode: '',
    },
  });

  async function handleLogin(data: ConfirmPassPayload) {
    try {
      const payload = {
        username,
        confirmationCode: data.confirmationCode,
      };

      const { nextStep } = await confirmSignUp(payload);
      if (nextStep.signUpStep === 'DONE') return router.push('/login');
    } catch (e) {
      console.error(e);
    }
  }

  async function handleResendCode() {
    await resendSignUpCode({ username });
  }

  return (
    <div>
      <p className='my-2 text-center'>Enter Email Verification Code</p>
      <form onSubmit={handleSubmit(handleLogin)} id='login-form'>
        <div className='mb-2 space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='confirmationCode' className='sr-only'>
              ConfirmationCode
            </Label>
            <Input
              id='confirmationCode'
              type='confirmationCode'
              {...register('confirmationCode')}
            />
          </div>
          {errors.confirmationCode && (
            <p className='mt-2 text-xs text-red-500'>
              {' '}
              {errors.confirmationCode?.message}{' '}
            </p>
          )}
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button form='login-form' type='submit'>
            Submit
          </Button>
          {/* <Button onClick={() => handleResendCode()} type='button'>
            Resend Signup Code
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default ConfirmSignupForm;
