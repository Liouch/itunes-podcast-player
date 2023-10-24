import { Podcast } from './Podcast';

export type GlobalState = {
  podcastList: Podcast[];
  activeTrackId: number | null;
  isTrackPlaying: boolean;
};
