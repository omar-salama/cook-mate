import { useRef } from 'react';
import { Field, FieldArray, FieldProps, FormikProps } from 'formik';
import {
  Button,
  Grid,
  TextInput,
  Textarea,
  Text,
  Group,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowRight, IconFileUpload } from '@tabler/icons-react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconX, IconDownload } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';

type IsStepValidCallback = (dataFromChild: boolean) => void;

interface ChildProps {
  isStepValid: IsStepValidCallback;
}

const FirstFormStep: React.FC<ChildProps & { formik: FormikProps<IRecipe> }> = ({ formik, isStepValid }) => {
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();

  const checkStep = async (formik: FormikProps<IRecipe>) => {
    const isInvalid = Object.keys(formik.errors).length > 0;
    // pass value to parent component
    isStepValid(!isInvalid && formik.dirty);
  };
  return (
    <Grid justify='space-between'>
      <Grid.Col span={{ base: 12, sm: 5.5 }} order={{ base: 2, sm: 1 }}>
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
            <h5 className='font-bold text-xl mt-5 mb-3'>Recipe Ingredients</h5>
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
                  <Button
                    className='bg-gray text-xs rounded-full py-1 px-20'
                    onClick={() => push('')}
                  >
                    Add New
                  </Button>
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
              onClick={() => checkStep(formik)}
            >
              Next
            </Button>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 5.5 }} order={{ base: 1, sm: 2 }}>
        <Grid>
          <Grid.Col>
            <h5 className='font-bold text-xl text-primary'>Recipe Images</h5>
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
                    <Dropzone.Reject>Images less than 10MBs</Dropzone.Reject>
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
  );
};

export default FirstFormStep;
