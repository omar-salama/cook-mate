import { ActionIcon, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import Image from 'next/image';

export default function FilterForm() {
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (values) => {
      console.log('Searching for:', values.search);
      // Search logic here
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          id='search'
          name='search'
          value={formik.values.search}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          radius='lg'
          size='lg'
          placeholder='Search for new recipes'
          rightSection={
            <ActionIcon size={32} radius='xl' color='transparent' type='submit'>
              <Image
                src='/images/search.svg'
                width={18}
                height={18}
                alt='Search'
              />
            </ActionIcon>
          }
        />
      </form>
    </>
  );
}
