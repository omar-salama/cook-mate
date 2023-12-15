'use client';

import { useEffect, useState } from 'react';
import {
  Grid,
  Loader,
} from '@mantine/core';
import Image from 'next/image';
import Tabs from './_components/Home/Tabs';
import RecipeCard from './_components/Home/RecipeCard';
import { fetchRecipes } from '../utils/recipe';
import { useSession } from "next-auth/react";
import SearchComponent from './_components/Home/Search';

export default function Home() {
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchRecipeData() {
      const data = await fetchRecipes();
      setRecipes(data);
    }
    fetchRecipeData();
  }, []);

  return (
    <>
      {/* main header */}
      <section className='flex flex-col sm:flex-row items-center justify-between text-center sm:text-start'>
        <div>
          <p className='text-4xl font-bold'>Hello, {session?.user?.name}</p>
          <p className='text-xl mb-6 mt-2'>What are you cooking today?</p>
          <SearchComponent />
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
      <section className='mt-12 flex justify-between'>
        <Tabs></Tabs>
      </section>
      {/* recipe cards */}
      <section className='mt-12'>
        <Grid gutter={{ base: 15, xs: 25, md: 35, lg: 50 }}>
          {recipes === null ? (
            <Loader color='main' className='mx-auto'></Loader>
          ) : recipes.length === 0 ? (
            <div>No Recipes Found</div>
          ) : (
            recipes.map((recipe, idx) => (
              <Grid.Col key={idx} span={{ base: 12, xs: 6, sm: 4, lg: 3 }}>
                <RecipeCard recipe={recipe}></RecipeCard>
              </Grid.Col>
            ))
          )}
        </Grid>
      </section>
    </>
  );
}
