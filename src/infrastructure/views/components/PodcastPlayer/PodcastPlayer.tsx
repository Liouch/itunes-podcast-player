import React from 'react';
import PodcastSummary from '../PodcastSummary';
import { Podcast } from '../../../../domain/models/Podcast';
import PlayPauseButton from '../PlayPauseButton';
import { Slider } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import moment from 'moment';

type Props = {
  activeTrack: Podcast;
};

const PodcastPlayer = () => {
  const [sliderValues, setSliderValues] = React.useState({
    podcastLength: 0,
    volume: 50,
  });

  const handleChange = (
    e: Event,
    newValue: number | number[],
    name: string
  ) => {
    setSliderValues({ ...sliderValues, [name]: newValue });
  };

  const millisecondsToTime = (milliseconds: number) => {
    const duration = moment(milliseconds).format('mm:ss');

    return duration;
  };
  const activeTrack = {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 896497589,
    trackId: 896497589,
    artistName: 'Chloe Doyeon',
    collectionName: '마케팅, 글로벌 비즈니스 전략 : Not A But B Strategy',
    trackName: '마케팅, 글로벌 비즈니스 전략 : Not A But B Strategy',
    releaseDate: '2018-03-25T22:00:00Z',
    primaryGenreName: 'Business',
    trackTimeMillis: 3572,
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/cb/cd/34/cbcd342c-b5a6-7ffd-a8c8-9d7d1f0d0cc2/mza_6785646122763709701.png/600x600bb.jpg',
  };
  return (
    <div className='flex gap-4 sticky bottom-0 max-h-[110px] bg-[var(--bg-color-lighter)] w-full'>
      <div className='flex w-1/2 gap-4 items-center justify-between'>
        <PodcastSummary
          media={activeTrack.artworkUrl600}
          artistName={activeTrack.artistName}
          trackName={activeTrack.trackName}
          isPodcastPlayer
        />
        <div className='flex items-center w-full justify-end'>
          <PlayPauseButton icon='shuffle' size='large' />
          <PlayPauseButton icon='skipPrevious' size='large' />
          <PlayPauseButton icon='pause' size='large' />
          <PlayPauseButton icon='skipNext' size='large' />
          <PlayPauseButton icon='replay' size='large' />
        </div>
      </div>
      <div className='flex w-1/2 gap-4 items-center justify-between'>
        <div className='flex w-4/5 items-center'>
          <span className='pr-4'>
            {millisecondsToTime(sliderValues.podcastLength)}
          </span>
          <Slider
            aria-label='track length'
            value={sliderValues.podcastLength}
            onChange={(e, value) => handleChange(e, value, 'podcastLength')}
            className='text-white'
            name='podcastLength'
            min={0}
            max={activeTrack.trackTimeMillis}
          />
          <span className='pl-4'>
            {millisecondsToTime(activeTrack.trackTimeMillis)}
          </span>
        </div>
        <div className='flex w-1/5 pr-6 items-center'>
          <span className='flex mr-4 items-center'>
            <VolumeUp />
          </span>
          <Slider
            aria-label='Volume'
            value={sliderValues.volume}
            onChange={(e, value) => handleChange(e, value, 'volume')}
            className='text-white'
            name='volume'
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
