import { Rating as MantineRating } from '@mantine/core';

const RatingView = ({ value }: { value: number }) => {
  return (
    <div className='flex items-center'>
      <p className='font-bold text-xl'>{value}</p>
      <MantineRating
        className='ms-2'
        readOnly
        value={value}
        color='orange'
        fractions={2}
      />
    </div>
  );
};

export default RatingView;
