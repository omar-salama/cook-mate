'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isHomePath = pathname === '/';
  const isAddPath = pathname === '/recipe/add';
  const isAuth = pathname === '/login' || pathname === '/register';
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
      {!isAuth && (
        <ul className='flex flex-col sm:flex-row items-center text-sm font-semibold'>
          <li className='sm:mx-3 sm:my-3 my-1'>Recent Recipes</li>
          {isHomePath && <li className='sm:mx-3 sm:my-3 my-1'>Account</li>}
          {!isAddPath && (
            <li className='ms-3 sm:mt-0 mt-3'>
              <Link
                className='bg-secondary hover:bg-secondary/[.9] text-white rounded-full py-3 px-1 sm:px-6'
                href='/recipe/add'
              >
                Add New Recipe
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
