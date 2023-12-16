'use client';
import { Grid } from '@mantine/core';
import RegisterForm from './RegisterForm';
import { natasha } from '@/theme';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <h1 className={`${natasha.className} text-5xl mb-3`}>
          Join the CookMate community!
        </h1>
        <h4 className='font-medium text-xl'>Create your account</h4>
        <RegisterForm />
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, md: 6 }}
        offset={2}
        className='hidden md:block'
      >
        <Image
          className='ms-auto'
          src='/images/register-image.svg'
          alt='Cook Image'
          width={350}
          height={200}
        />
      </Grid.Col>
    </Grid>
  );
}
