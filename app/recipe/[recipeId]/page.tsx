'use client';

import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import RatingView from '@/app/_components/RatingView';
import Rate from './Rate';
import { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '@/utils/recipe';

export default function RecipeDetails({
  params,
}: {
  params: { recipeId: string };
}) {
  const [recipe, setRecipe] = useState<IRecipe>();
  useEffect(() => {
    async function fetchRecipeData() {
      const data = await fetchRecipeDetails(params.recipeId);
      setRecipe(data);
    }
    fetchRecipeData();
  }, [params.recipeId]);

  const images = [
    '/images/samosa.svg',
    '/images/samosa.svg',
    '/images/samosa.svg',
    '/images/samosa.svg',
    '/images/samosa.svg',
  ];

  if (!recipe) return;
  return (
    <div className='grid grid-cols-12 gap-5 md:gap-10'>
      {/* recipe image */}
      <div className='col-span-12'>
        <div className='grid grid-cols-12 gap-1 md:gap-4'>
          {/* first half */}
          <div className='col-span-6'>
            <Image
              className='w-full h-full max-h-[19rem] object-cover rounded-2xl'
              src={images[0]}
              alt='recipe image'
              height={200}
              width={200}
            />
          </div>
          {/* nested Grid for the second half */}
          <div className='col-span-6'>
            <div className='grid grid-cols-12 gap-1 md:gap-4'>
              {images.slice(1).map((item, idx) => (
                <div key={idx} className='col-span-6'>
                  <Image
                    className='w-full h-full max-h-36 object-cover rounded-2xl'
                    src={item}
                    alt='recipe image'
                    height={200}
                    width={200}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-12 md:col-span-7'>
        <div className='flex justify-between items-center mb-3'>
          <RatingView value={recipe.rating} />
          <Rate recipeId={params.recipeId} recipeName={recipe.name} />
        </div>
        <div className='mb-6 md:mb-12'>
          <h2 className='font-bold text-xl md:text-3xl'>{recipe.name}</h2>
          <div className='flex my-3'>
            <div className='orange-badge me-2'>By {recipe.author?.name}</div>
            <div className='orange-badge'>{formatDate(recipe?.createdAt)}</div>
          </div>
          <p>{recipe.description}</p>
        </div>
        <div>
          <h4 className='bg-gray2 w-fit py-1 px-3 font-bold text-lg'>
            Making Steps
          </h4>
          {recipe.steps.map((step, index) => (
            <div key={index} className='my-3 md:my-7'>
              <p className='mb-2 font-bold'>Step {index + 1}</p>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='col-span-12 md:col-span-5 px-5 py-3 md:p-5 mb-5 md:mb-0 rounded-3xl border border-dashed border-black h-fit'>
        <h4 className='font-bold text-lg py-2'>Ingredients</h4>
        {recipe.ingredients.map((ing, index) => (
          <p
            className='bg-gray2 py-1 px-3 md:p-3 my-2.5 rounded-lg'
            key={index}
          >
            {ing}
          </p>
        ))}
      </div>
    </div>
  );
}
