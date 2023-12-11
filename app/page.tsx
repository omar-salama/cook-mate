'use client';

import FilterForm from './_components/Home/FilterForm';
import Image from 'next/image';

export default function Home() {
  const handleFilterSubmit = (values: {
    keyword: string;
    category: string;
  }) => {
    console.log('Filter values:', values);
    // filter logic here
  };


  return (
    <>
      <section className='flex flex-col sm:flex-row items-center justify-between text-center sm:text-start'>
        <div>
          <p className='text-4xl font-bold'>Hello, Omar</p>
          <p className='text-xl mb-6 mt-2'>What are you cooking today?</p>
          <FilterForm />
        </div>
        <Image
          className='rounded-full lg:me-12 mt-10'
          src='/images/dish.png'
          alt='dish'
          width={430}
          height={430}
        ></Image>
      </section>
    </>
  );
}
