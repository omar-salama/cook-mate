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
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string().required('Required'),
});
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterFrom() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const callbackUrl = searchParams.get('callbackUrl') || '/recipe/add';

  const initialValues: FormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      console.log(res);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });
      console.log('hehehehe');
      router.push(callbackUrl);
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
      {({ values }) => (
        <Form>
          <div className='h-16 flex items-center w-full'>
            {error && (
              <Notification w='100%' color='red' radius={5} title={error} />
            )}
          </div>
          <div className='mb-3'>
            <Field name='name'>
              {({ field, meta }: FieldProps) => (
                <>
                  <TextInput
                    radius={17}
                    error={meta.touched && meta.error}
                    label='Name'
                    placeholder='Type your name'
                    {...field}
                  />
                </>
              )}
            </Field>
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
          <div className='mb-3'>
            <Field
              name='confirmPassword'
              validate={(value: string) => {
                if (value !== values.password) {
                  return 'Password doesn\'t match';
                }
              }}
            >
              {({ field, meta }: FieldProps) => (
                <>
                  <TextInput
                    radius={17}
                    error={meta.touched && meta.error}
                    type='password'
                    label='Confirm Password'
                    placeholder='***********'
                    {...field}
                  />
                </>
              )}
            </Field>
          </div>
          <div className='mb-3 font-medium'>
            <Link href='/login'>Already have an account?</Link>
          </div>
          <MainSubmitButton label='JOIN US' loading={loading} />
        </Form>
      )}
    </Formik>
  );
}
