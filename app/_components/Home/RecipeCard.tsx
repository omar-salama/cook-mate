import Image from 'next/image';
import Link from 'next/link';

export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  return (
    <Link className='w-4/5 sm:w-full mx-auto' href={`/recipe/${recipe.id}`}>
      <Image
        style={{
          marginBottom: '-6rem',
        }}
        className='mx-auto rounded-full'
        src='/images/dish.png'
        height={180}
        width={180}
        alt='Recipe Dish'
      />
      <div className='p-4 border rounded-xl bg-gray pt-24'>
        <div className='recipe-name-container'>
          <p
            className='text-center mx-auto font-semibold text-xl my-12 overflow-hidden'
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
    </Link>
  );
}
