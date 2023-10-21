import { Podcast } from '../models/Podcast';

export interface PodcastRepository {
  getPodcastList: (param: string) => Promise<Podcast[]>;
  getPodcastColection: (id: string) => Promise<Podcast[]>;
}
