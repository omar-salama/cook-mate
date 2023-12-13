'use client';
import { useEffect, useState } from 'react';
import {
  Formik,
  Form,
} from 'formik';
import * as Yup from 'yup';
import { Container, Grid } from '@mantine/core';
import FirstFormStep from './FirstFormStep';
import SecondStepForm from './SecondStepForm';

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

  const initialValues = {
    name: '',
    description: '',
    ingredients: ['', '', ''],
    steps: ['', '', ''],
  };

  const handleNextStep = (isValid: boolean) => {
    if (isValid) setCurrentStep((prevStep) => prevStep + 1);
  };

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
              <FirstFormStep
                formik={formik}
                isStepValid={handleNextStep}
              />
            )}

            {currentStep === 2 && (
              <SecondStepForm />
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RecipeForm;
