import { Podcast } from '../../domain/models/Podcast';
import { PodcastRepository } from '../../domain/repositories/PodcastRepository';
import { PodcastDTO } from '../../infrastructure/http/dto/PodcastDTO';

export const podcastRepository = (): PodcastRepository => ({
  getPodcastList: async (param: string = '') => {
    const url = `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${param}&entity=podcast`;
    try {
      const response = await fetch(url, {
        // These headers are needed to make cors-anywhere work
        headers: {
          Host: 'cors-anywhere.herokuapp.com',
          Origin: 'null',
        },
      });

      if (!response.ok) {
        throw new Error(
          `There was an error with the network response ${response.status}`
        );
      }
      const podcasts = await response.json();
      return podcasts.results.map(
        (podcastDTO: PodcastDTO): Podcast => ({
          wrapperType: podcastDTO.wrapperType,
          kind: podcastDTO.kind,
          collectionId: podcastDTO.collectionId,
          trackId: podcastDTO.trackId,
          artistName: podcastDTO.artistName,
          collectionName: podcastDTO.collectionName,
          trackName: podcastDTO.trackName,
          releaseDate: podcastDTO.releaseDate,
          primaryGenreName: podcastDTO.primaryGenreName,
          artworkUrl600: podcastDTO.artworkUrl600,
          longDescription: podcastDTO?.longDescription,
        })
      );
    } catch (error) {
      console.log('There was an error', error);
    }
  },

  getPodcastListSorted: (
    podcasts: Podcast[],
    sortField: keyof Podcast | null
  ) => {
    return sortField !== null
      ? [...podcasts].sort((a: Podcast, b: Podcast) =>
          a[sortField]! > b[sortField]! ? 1 : -1
        )
      : podcasts;
  },

  getPodcastColection: async (id) => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/search?term=${id}&entity=podcast`
        )}`
      );
      if (!response.ok) {
        throw new Error(
          `There was an error with the network response ${response.status}`
        );
      }
      const podcasts = await response.json();
      return podcasts.map(
        (podcastDTO: PodcastDTO): Podcast => ({
          wrapperType: podcastDTO.wrapperType,
          kind: podcastDTO.kind,
          collectionId: podcastDTO.collectionId,
          trackId: podcastDTO.trackId,
          artistName: podcastDTO.artistName,
          collectionName: podcastDTO.collectionName,
          trackName: podcastDTO.trackName,
          releaseDate: podcastDTO.releaseDate,
          primaryGenreName: podcastDTO.primaryGenreName,
          artworkUrl600: podcastDTO.artworkUrl600,
          longDescription: podcastDTO?.longDescription,
        })
      );
    } catch (error) {
      console.log('There was an error', error);
    }
  },
});
