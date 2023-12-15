'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Loader, Rating as MantineRating, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

const Rate = ({
  recipeId,
  recipeName,
}: {
  recipeId: string;
  recipeName: string;
}) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, { open: openModel, close: closeModel }] = useDisclosure();

  useEffect(() => {
    fetchUserRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    submitRating(recipeId, session?.user?.id, newRating);
  };

  const fetchUserRating = async () => {
    try {
      const response = await fetch(
        `/api/rating?recipeId=${recipeId}&userId=${session?.user?.id}`
      );
      if (response.ok) {
        const { userRating } = await response.json();
        setUserRating(userRating?.value || 0);
      } else if (response.status === 404) {
        setUserRating(0);
      } else {
        console.error('Failed to fetch user rating');
      }
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const submitRating = async (
    recipeId: string,
    userId: string | undefined,
    value: number
  ) => {
    try {
      setLoading(true);
      const response = await fetch('/api/rating/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId, userId, value }),
      });

      if (response.ok) {
        closeModel();
        setLoading(false);
        fetchUserRating();
      } else {
        setLoading(false);
        console.error(
          'Failed to submit rating',
          (await response.json()).message
        );
      }
    } catch (error) {
      setLoading(false);
      console.error('Error submitting rating:', error);
    }
  };

  return (
    {session && session.user && session.user.id && <>
      <div
        className='bg-muted rounded-3xl py-1 px-6 border border-black hover:bg-orangeMuted hover:cursor-pointer flex'
        onClick={openModel}
      >
        Rate
        <Image
          src='/images/star.svg'
          alt='star icon'
          width={18}
          height={18}
          className='ms-1 color-primary'
        />
      </div>
      <Modal
        opened={isOpen}
        onClose={closeModel}
        className='text-orangeMuted'
        title='Rate this recipe'
        centered
        padding='lg'
        radius='lg'
        transitionProps={{ transition: 'rotate-left' }}
      >
        <h4 className='font-bold text-4xl'>{recipeName}</h4>
        <div className='flex items-center my-4'>
          <MantineRating
            size='xl'
            className='me-4'
            color='orange'
            fractions={2}
            onChange={handleRatingChange}
            readOnly={loading}
            value={userRating}
          />
          {loading && <Loader color='main' size='sm' />}
        </div>
      </Modal>
    </>}
  );
};

export default Rate;
