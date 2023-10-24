import { GlobalState } from '../models/GlobalState';
import { Podcast } from '../models/Podcast';

export interface PodcastRepository {
  getPodcastList: (param: string) => Promise<Podcast[]>;
  getPodcastColection: (id: string) => Promise<Podcast[]>;
  getPodcastListSorted: (
    podcast: Podcast[],
    sortField: keyof Podcast | null
  ) => Podcast[];
  setPlayPauseTrack: (
    podcastsGlobalInfo: GlobalState,
    trackId: number
  ) => GlobalState;
}
