'use client';

import { Container, Grid } from '@mantine/core';
import { LoginForm } from './LoginForm';
import Image from 'next/image';
import { natasha } from '@/theme';

export default function LoginPage() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <h1 className={`${natasha.className} text-4xl`}>
          Welcome to CookMate!
        </h1>
        <h4 className='font-medium text-lg'>Sign in to your account</h4>
        <LoginForm />
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, md: 6 }}
        offset={2}
        className='invisible md:visible'
      >
        <Image
          className='ms-auto'
          src='/images/login-image.svg'
          alt='Cook Image'
          width={500}
          height={200}
        />
      </Grid.Col>
    </Grid>
  );
}
