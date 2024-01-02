import { object, string, z } from 'zod';

export const LoginValidation = object({
  email: string()
    .min(1, { message: 'Email is required' })
    .email('This is not a valid email address'),
  password: string().min(1, { message: 'Password is required' }),
});

export type LoginPayload = z.infer<typeof LoginValidation>;

export const ConfirmSignupFormValidation = object({
  confirmationCode: string().min(1, {
    message: 'Email verification code is required',
  }),
});

export type ConfirmPassPayload = z.infer<typeof ConfirmSignupFormValidation>;
