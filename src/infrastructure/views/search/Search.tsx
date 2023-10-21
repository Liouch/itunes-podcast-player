import React, { useEffect, useCallback } from 'react';
import { Podcast } from '../../../domain/models/Podcast';
import { podcastService } from '../../../domain/services/PodcastService';
import { podcastRepository } from '../../repositories/podcastRepository';

const Search = () => {
  const [podcasts, setPodcasts] = React.useState<Podcast[]>([]);

  const getpodcasts = useCallback(async () => {
    try {
      const responsePodcasts = await podcastService(
        podcastRepository()
      ).getPodcastList('jack');
      setPodcasts(responsePodcasts);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getpodcasts();
  }, [getpodcasts]);

  return (
    <div>
      {podcasts ? (
        podcasts.map((pod) => <h1 key={pod.trackId}>{pod.artistName}</h1>)
      ) : (
        <h1>no Podcast</h1>
      )}
    </div>
  );
};

export default Search;
