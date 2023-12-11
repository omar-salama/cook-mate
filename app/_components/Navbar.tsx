import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className='flex items-center justify-between mt-6 mb-12 sm:mb-14 sm:mt-16'>
      <Link href='/'>
        <Image
          src='/images/logo.svg'
          alt='CookMate Logo'
          width={200}
          height={42}
        />
      </Link>
      <ul className='flex flex-col sm:flex-row items-center text-sm font-semibold'>
        <li className='sm:mx-3 sm:my-3 my-1'>Recent Recipes</li>
        <li className='sm:mx-3 sm:my-3 my-1'>Account</li>
        <li className='ms-3 sm:mt-0 mt-3'>
          <Link
            className='bg-secondary hover:bg-secondary/[.9] text-white rounded-full py-3 px-4 sm:px-6'
            href='/recipe/add'
          >
            Add New Recipe
          </Link>
        </li>
      </ul>
    </div>
  );
}
