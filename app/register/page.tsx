'use client'
import { Grid } from '@mantine/core';
import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
  return (
    <Grid>
      <Grid.Col>
        <h1>Join the CookMate community</h1>
        <h4>Create your account</h4>
        <RegisterForm />
      </Grid.Col>
    </Grid>
  );
}
