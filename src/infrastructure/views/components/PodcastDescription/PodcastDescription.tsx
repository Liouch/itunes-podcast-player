import React from 'react';

type Props = {
  description: string | undefined;
};

const PodcastDescription = ({ description }: Props) => {
  const defaultDescription =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum maiores modi recusandae esse, nobis veritatis unde veniam     provident. Quam sequi soluta eaque nemo consequatur autem praesentium laborum, ipsa ducimus.';
  return (
    <p className='text-base line-clamp-2'>
      {description ? description : defaultDescription}
    </p>
  );
};

export default PodcastDescription;
