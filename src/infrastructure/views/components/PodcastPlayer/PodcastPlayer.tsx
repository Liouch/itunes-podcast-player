import React from 'react';
import PodcastSummary from '../PodcastSummary';
import PlayerIconButton from '../PlayerIconButton';
import { Slider } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import moment from 'moment';
import { usePodcast } from '../../contexts/PodcastGlobalContext';
import { podcastService } from '../../../../domain/services/PodcastService';
import { podcastRepository } from '../../../repositories/podcastRepository';

enum PreviousNext {
  Previous = 'Previous',
  Next = 'Next',
}

const PodcastPlayer = () => {
  const [sliderValues, setSliderValues] = React.useState({
    podcastLength: 0,
    volume: 50,
  });
  const { podcastsGlobalInfo, setPodcastsGlobalInfo } = usePodcast();
  const { podcastList, activeTrackId, isTrackPlaying } = podcastsGlobalInfo;

  const activeTrackIndex = podcastList.findIndex(
    (podcast) => podcast.trackId === activeTrackId
  );
  const activeTrack = activeTrackIndex > -1 && podcastList[activeTrackIndex];
  const onSliderhandleChange = (
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

  const onHandlePlayPause = () => {
    if (!activeTrackId) return;
    const updatedPodcastGlobalInfo = podcastService(
      podcastRepository()
    ).setPlayPauseTrack(podcastsGlobalInfo, activeTrackId);
    setPodcastsGlobalInfo(updatedPodcastGlobalInfo);
  };

  const onHandlePreviousNext = (arg: PreviousNext) => {
    // TODO: Need to cover edge case when the active track is the last track
    if (!activeTrackId) return;
    if (activeTrackIndex === 0 && arg === PreviousNext.Previous) return;
    const newTrackIndex =
      arg === PreviousNext.Previous
        ? activeTrackIndex - 1
        : activeTrackIndex + 1;
    const newTrack = podcastList[newTrackIndex];

    const updatedPodcastGlobalInfo = podcastService(
      podcastRepository()
    ).setPlayPauseTrack(podcastsGlobalInfo, newTrack.trackId);
    setPodcastsGlobalInfo(updatedPodcastGlobalInfo);
  };

  return (
    <div className='flex gap-4 sticky bottom-0 max-h-[110px] bg-[var(--bg-color-lighter)] w-full'>
      {activeTrack ? (
        <>
          <div className='flex w-1/2 gap-4 items-center justify-between'>
            <PodcastSummary
              media={activeTrack.artworkUrl600}
              artistName={activeTrack.artistName}
              trackName={activeTrack.trackName}
              isPodcastPlayer
            />
            <div className='flex items-center justify-end'>
              <PlayerIconButton icon='shuffle' size='large' />
              <PlayerIconButton
                icon='skipPrevious'
                size='large'
                onClick={() => onHandlePreviousNext(PreviousNext.Previous)}
              />
              <PlayerIconButton
                icon={isTrackPlaying ? 'pause' : 'play'}
                size='large'
                onClick={onHandlePlayPause}
              />
              <PlayerIconButton
                icon='skipNext'
                size='large'
                onClick={() => onHandlePreviousNext(PreviousNext.Next)}
              />
              <PlayerIconButton icon='replay' size='large' />
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
                onChange={(e, value) =>
                  onSliderhandleChange(e, value, 'podcastLength')
                }
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
                onChange={(e, value) =>
                  onSliderhandleChange(e, value, 'volume')
                }
                className='text-white'
                name='volume'
                min={0}
                max={100}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PodcastPlayer;
