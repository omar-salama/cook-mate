'use client';

import { useState } from 'react';
import { Combobox, Grid, Input, InputBase, useCombobox } from '@mantine/core';
import Image from 'next/image';
import FilterForm from './_components/Home/FilterForm';
import Tabs from './_components/Home/Tabs';
import RecipeCard from './_components/Home/RecipeCard';

export default function Home() {

  const filterCriteria = ['Newest', 'Most Popular', 'Highest Rated'];

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = filterCriteria.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  // for testing
  const data = [
    { name: 'Classic Green Salad', time: '15' },
    { name: 'Crunchy Nut Coleslaw', time: '15' },
    { name: 'Shrimp Chicken Andouille Jambalaya', time: '15' },
    { name: 'Barbecue Chicken Jollof Rice', time: '15' },
    { name: 'Classic Green Salad', time: '15' },
    { name: 'Crunchy Nut Coleslaw', time: '15' },
    { name: 'Shrimp Chicken Andouille Jambalaya', time: '15' },
    { name: 'Barbecue Chicken Jollof Rice', time: '15' },
  ];
  return (
    <>
      {/* main header */}
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
      {/* filteration */}
      <section className='mt-12 flex justify-between flex-wrap'>
        <Tabs></Tabs>
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component='button'
              type='button'
              pointer
              radius='md'
              size='md'
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents='none'
              onClick={() => combobox.toggleDropdown()}
            >
              {value || <Input.Placeholder>Filter By</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown color='black'>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </section>
      {/* recipe cards */}
      <section className='mt-12'>
        <Grid gutter={{ base: 15, xs: 25, md: 35, lg: 50 }}>
          {data.map((recipe, idx) => (
            <Grid.Col key={idx} span={{ base: 12, xs: 6, sm: 4, lg: 3 }}>
              <RecipeCard recipe={recipe}></RecipeCard>
            </Grid.Col>
          ))}
        </Grid>
      </section>
    </>
  );
}
