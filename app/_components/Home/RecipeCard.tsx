import { IconStar, IconStarFilled } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className='relative w-4/5 sm:w-full mx-auto mb-24'>
        <div className='w-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Image
            className='rounded-full mx-auto'
            src='/images/dish.png'
            height={220}
            width={220}
            alt='Recipe Dish'
            priority={false}
          />
          {/* rating badge */}
          <div className='absolute top-1/2 right-0 transform -translate-y-11 bg-[#FDEED9] rounded-full py-1.5 px-2.5'>
            <span className='font-semibold flex items-center'>
              <Image
                src='/icons/star-filled.svg'
                alt='star icon'
                width={18}
                height={18}
                className='me-2 color-primary'
              />
              {recipe.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <div className='p-4 border rounded-xl bg-gray pt-24'>
          <div className='recipe-name-container'>
            <p
              className='text-center font-semibold text-xl my-12 overflow-hidden'
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 2, // number of lines to show
                minHeight: '3.4rem',
              }}
            >
              {recipe.name}
            </p>
            <p>Time</p>
          </div>
          <div className='recipe-details flex items-center justify-between'>
            <p className='font-bold'>15 Mins</p>
            <div className='bg-muted rounded-full p-1.5'>
              <Image
                src='/images/bookmark.svg'
                width={25}
                height={25}
                alt='bookmark'
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
