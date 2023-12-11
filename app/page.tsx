'use client';

import { useState } from 'react';
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import Image from 'next/image';
import FilterForm from './_components/Home/FilterForm';
import Tabs from './_components/Home/Tabs';

export default function Home() {

  const tabs = [
    'All Recipes',
    'Arabian',
    'Asian',
    'Italian',
    'Indian',
    'Chinese',
  ];

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
        <Tabs tabs={tabs}></Tabs>
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
      </section>
    </>
  );
}
