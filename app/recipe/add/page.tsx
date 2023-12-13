'use client';
import { useEffect, useState } from 'react';
import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikProps,
  FieldProps,
} from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  Grid,
  TextInput,
  Textarea,
  Text,
  Group,
  rem,
  useMantineTheme,
  // ImageUpload,
} from '@mantine/core';
import { IconArrowRight, IconFileUpload } from '@tabler/icons-react';
import { useRef } from 'react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';
import Image from 'next/image';

const validationSchemaStep1 = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  ingredients: Yup.array().of(Yup.string().required('Ingredient is required')),
});
const validationSchemaStep2 = Yup.object().shape({
  steps: Yup.array().of(Yup.string().required('Step is required')),
});

const RecipeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationSchema, setValidationSchema] = useState<
    Yup.ObjectSchema<any, any>
  >(validationSchemaStep1);

  useEffect(() => {
    setValidationSchema(
      currentStep === 1 ? validationSchemaStep1 : validationSchemaStep2
    );
  }, [currentStep]);

  const goToNextStep = async (formik: FormikProps<IRecipe>) => {
    const isInvalid = Object.keys(formik.errors).length > 0;

    if (!isInvalid && formik.dirty) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const initialValues = {
    name: '',
    description: '',
    ingredients: ['', '', ''],
    steps: ['', '', ''],
  };

  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 5.5 }}>
          <h2 className='font-bold text-xl lg:text-4xl mb-10'>
            Share Your Recipe with the CookMate Community!
          </h2>
        </Grid.Col>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          // Handle step 2 submission
          console.log(values, actions);
        }}
      >
        {(formik) => (
          <Form>
            {currentStep === 1 && (
              <Grid justify='space-between'>
                <Grid.Col
                  span={{ base: 12, sm: 5.5 }}
                  order={{ base: 2, sm: 1 }}
                >
                  <Grid>
                    <Grid.Col>
                      <h5 className='font-bold text-xl text-primary'>
                        First Recipe Details
                      </h5>
                    </Grid.Col>
                    <Grid.Col>
                      <Field name='name'>
                        {({ field, meta }: FieldProps) => (
                          <>
                            <TextInput
                              radius={50}
                              label='Recipe Name'
                              placeholder='Type your recipe name'
                              id={field.name}
                              error={meta.touched && meta.error}
                              {...field}
                            />
                          </>
                        )}
                      </Field>
                    </Grid.Col>
                    <Grid.Col>
                      <Field name='description'>
                        {({ field, meta }: FieldProps) => (
                          <>
                            <Textarea
                              radius={12}
                              label='Recipe Description'
                              placeholder='Put some details of your recipe'
                              id={field.name}
                              error={meta.touched && meta.error}
                              {...field}
                            />
                          </>
                        )}
                      </Field>
                    </Grid.Col>
                    <Grid.Col>
                      <h5 className='font-bold text-xl mt-5 mb-3'>
                        Recipe Ingredients
                      </h5>
                    </Grid.Col>
                    <FieldArray name='ingredients'>
                      {({ push, form }) => (
                        <>
                          {form.values.ingredients.map(
                            (ingredient: string, index: number) => (
                              <Grid.Col key={index}>
                                <Field name={`ingredients.${index}`}>
                                  {({ field, meta }: FieldProps) => (
                                    <>
                                      <TextInput
                                        radius={12}
                                        placeholder={`Ingredient ${index + 1}`}
                                        id={field.name}
                                        error={meta.touched && meta.error}
                                        {...field}
                                      />
                                    </>
                                  )}
                                </Field>
                              </Grid.Col>
                            )
                          )}
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
                      <Button
                        rightSection={<IconArrowRight size={14} />}
                        fullWidth
                        radius={100}
                        color='secondary'
                        type='submit'
                        onClick={() => goToNextStep(formik)}
                      >
                        Next
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
                <Grid.Col
                  span={{ base: 12, sm: 5.5 }}
                  order={{ base: 1, sm: 2 }}
                >
                  <Grid>
                    <Grid.Col>
                      <h5 className='font-bold text-xl text-primary'>
                        Recipe Images
                      </h5>
                    </Grid.Col>
                    <Grid.Col>
                      <div className={classes.wrapper}>
                        <Dropzone
                          openRef={openRef}
                          onDrop={() => {}}
                          className={classes.dropzone}
                          accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
                          maxSize={10 * 1024 ** 2}
                        >
                          <div style={{ pointerEvents: 'none' }}>
                            <Group justify='center'>
                              <Dropzone.Accept>
                                <IconDownload
                                  style={{ width: rem(25), height: rem(25) }}
                                  color={theme.colors.blue[6]}
                                  stroke={1.5}
                                />
                              </Dropzone.Accept>
                              <Dropzone.Reject>
                                <IconX
                                  style={{ width: rem(25), height: rem(25) }}
                                  color={theme.colors.red[6]}
                                  stroke={1.5}
                                />
                              </Dropzone.Reject>
                            </Group>

                            <Text ta='center' fw={700} fz='lg' mt='xl'>
                              <Dropzone.Accept>Drop files here</Dropzone.Accept>
                              <Dropzone.Reject>
                                Images less than 10MBs
                              </Dropzone.Reject>
                              <Dropzone.Idle>
                                <div className='flex justify-center pt-3'>
                                  <IconFileUpload
                                    style={{ width: rem(25), height: rem(25) }}
                                    stroke={1.5}
                                  />
                                </div>
                              </Dropzone.Idle>
                            </Text>
                          </div>
                        </Dropzone>
                      </div>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            )}

            {currentStep === 2 && (
              <Grid justify='space-between'>
                <Grid.Col span={{ base: 12, sm: 5.5 }}>
                  <h5 className='font-bold text-xl text-primary'>
                    Second Recipe Steps
                  </h5>
                  <FieldArray name='steps'>
                    {({ push, remove, form }) => (
                      <>
                        {form.values.steps.map(
                          (step: string, index: number) => (
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
                          )
                        )}
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
                    <Button
                      rightSection={<IconArrowRight size={14} />}
                      fullWidth
                      radius={100}
                      color='secondary'
                      type='submit'
                      onClick={() => goToNextStep(formik)}
                    >
                      Save
                    </Button>
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
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RecipeForm;
