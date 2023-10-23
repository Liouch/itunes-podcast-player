import React from 'react';

type Props = {
  media: string;
  artistName: string;
  trackName: string;
  isPodcastPlayer?: boolean;
};

const PodcastSummary = ({
  trackName,
  artistName,
  media,
  isPodcastPlayer,
}: Props) => {
  const imgSize = {
    small: '60px',
    large: '110px',
  };
  const imgProps = {
    width: isPodcastPlayer ? imgSize.large : imgSize.small,
    height: isPodcastPlayer ? imgSize.large : imgSize.small,
    className: isPodcastPlayer ? '' : 'rounded-lg',
  };
  return (
    <div className='flex gap-5 items-center'>
      <img src={media} alt={`${artistName} cover`} {...imgProps} />
      <div>
        <p className='text-base text-white line-clamp-1'> {trackName} </p>
        <p> {artistName} </p>
      </div>
    </div>
  );
};

export default PodcastSummary;
