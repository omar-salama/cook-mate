'use client';

import { useState } from 'react';
import { Notification, TextInput } from '@mantine/core';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Field, Form, Formik, FieldProps } from 'formik';
import * as Yup from 'yup';
import MainSubmitButton from '../_components/MainSubmitButton';
import Link from 'next/link';

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
  const callbackUrl = searchParams.get('callbackUrl') || '/recipe/add';

  const initialValues: FormData = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: FormData) => {
    try {
      setLoading(true);

      const res = await signIn('credentials', {
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
  );
};
