import { Field, FieldArray, FieldProps } from 'formik';
import { Button, Grid, Textarea } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import MainSubmitButton from '@/app/_components/MainSubmitButton';

const SecondStepForm = ({ loading = false }) => {
  return (
    <Grid justify='space-between'>
      <Grid.Col span={{ base: 12, sm: 5.5 }}>
        <h5 className='font-bold text-xl text-primary'>Second Recipe Steps</h5>
        <FieldArray name='steps'>
          {({ push, form }) => (
            <>
              {form.values.steps.map((step: string, index: number) => (
                <Grid.Col key={index}>
                  <Field name={`steps.${index}`}>
                    {({ field, meta }: FieldProps) => (
                      <>
                        <Textarea
                          label={`Step ${index + 1}`}
                          radius={12}
                          autosize
                          minRows={4}
                          placeholder='Steps to make your recipe'
                          id={field.name}
                          error={meta.touched && meta.error}
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                </Grid.Col>
              ))}
              <Grid.Col>
                <button
                  className='bg-gray text-xs rounded-full py-1 px-20'
                  onClick={() => push('')}
                >
                  Add New
                </button>
              </Grid.Col>
            </>
          )}
        </FieldArray>
        <Grid.Col className='mt-6'>
          <MainSubmitButton label='Save' loading={loading} />
        </Grid.Col>
      </Grid.Col>
      <Grid.Col span={6}>
        <div className='flex justify-center'>
          <Image
            src='/images/chars.svg'
            width={300}
            height={300}
            alt='recipe'
          ></Image>
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default SecondStepForm;
