'use client';

import { useState } from 'react';
import { Notification, TextInput } from '@mantine/core';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Field, Form, Formik, FieldProps } from 'formik';
import * as Yup from 'yup';
import MainSubmitButton from '../_components/MainSubmitButton';
import Link from 'next/link';
import Image from 'next/image';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

interface FormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const initialValues: FormData = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: FormData) => {
    try {
      setError('');
      setLoading(true);
      const res = await signIn('email-login', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('Invalid email or password');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className='h-16 flex items-center w-full'>
              {error && (
                <Notification w='100%' color='red' radius={5} title={error} />
              )}
            </div>
            <div className='mb-3'>
              <Field name='email'>
                {({ field, meta }: FieldProps) => (
                  <>
                    <TextInput
                      radius={17}
                      error={meta.touched && meta.error}
                      label='Email Address'
                      placeholder='Type your email address'
                      {...field}
                    />
                  </>
                )}
              </Field>
            </div>
            <div className='mb-3'>
              <Field name='password'>
                {({ field, meta }: FieldProps) => (
                  <>
                    <TextInput
                      radius={17}
                      error={meta.touched && meta.error}
                      type='password'
                      label='Password'
                      placeholder='***********'
                      {...field}
                    />
                  </>
                )}
              </Field>
            </div>
            <div className='mb-3 font-medium'>
              <Link href='/register'>New to CookMate?</Link>
            </div>
            <MainSubmitButton label='SIGN IN NOW' loading={loading} />
          </Form>
        )}
      </Formik>
      <div className='flex items-center mt-4 mb-1 before:flex-1 before:border-t before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
        <p className='text-center font-semibold mx-4 mb-0'>Or Sign In With</p>
      </div>
      <div className='flex justify-center gap-1'>
        <button onClick={() => signIn('github', { callbackUrl })} role='button'>
          <Image
            src='/icons/github.svg'
            alt='GitHub Login'
            height={40}
            width={40}
          />
        </button>
        <button onClick={() => signIn('google', { callbackUrl })} role='button'>
          <Image
            src='/icons/google.svg'
            alt='GitHub Login'
            height={35}
            width={35}
          />
        </button>
      </div>
    </>
  );
};
