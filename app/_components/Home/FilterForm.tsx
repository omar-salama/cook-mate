import { useFormik } from 'formik';
import Image from 'next/image';

export default function FilterForm() {
  const formik = useFormik({
    initialValues: {
      recipe: '',
    },
    onSubmit: (values) => {
      console.log('Searching for:', values.recipe);
      // Search logic here
    },
  });

  return (
    <>
      <form className='flex items-center' onSubmit={formik.handleSubmit}>
        <input
          className='rounded-xl border px-6 py-3'
          id='recipe'
          name='recipe'
          value={formik.values.recipe}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Search for new recipes'
          size={28}
        />
        <button type='submit'>
          <Image
            className='ms-3'
            src='/images/search-line.png'
            width={25}
            height={25}
            alt='Search'
          />
        </button>
      </form>        
    </>
  );
}
