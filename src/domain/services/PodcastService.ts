import { PodcastRepository } from '../repositories/PodcastRepository';

export const podcastService = (
  repository: PodcastRepository
): PodcastRepository => ({
  getPodcastList: (param) => {
    return repository.getPodcastList(param);
  },
  getPodcastColection: (id) => {
    return repository.getPodcastColection(id);
  },
  getPodcastListSorted: (podcast, sortField) => {
    return repository.getPodcastListSorted(podcast, sortField);
  },
  setPlayPauseTrack: (podcastsGlobalInfo, trackId) => {
    return repository.setPlayPauseTrack(podcastsGlobalInfo, trackId);
  },
});
