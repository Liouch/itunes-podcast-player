import { useCallback, useState, useRef } from 'react';
import { Podcast } from '../../../domain/models/Podcast';
import { podcastService } from '../../../domain/services/PodcastService';
import { podcastRepository } from '../../repositories/podcastRepository';
import SearchBar from '../components/SearchBar/SearchBar';
import TableResults from '../components/TableResults';
import { usePodcast } from '../contexts/PodcastGlobalContext';

const Search = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  // This intervarlRef is used to store the interval between renders
  const { podcastsGlobalInfo, setPodcastsGlobalInfo } = usePodcast();
  const intervalRef = useRef<ReturnType<typeof setTimeout> | number>(0);

  const getPodcasts = useCallback(
    async (value: string) => {
      try {
        const responsePodcasts = await podcastService(
          podcastRepository()
        ).getPodcastList(value);
        setPodcasts(responsePodcasts);
        setPodcastsGlobalInfo({
          ...podcastsGlobalInfo,
          podcastList: responsePodcasts,
        });
      } catch (e) {
        console.error(e);
      }
    },
    [podcastsGlobalInfo, setPodcastsGlobalInfo]
  );

  const handleSearchChange = (value: string) => {
    if (value === '') {
      setPodcasts([]);
      return;
    }
    // Debounce to avoid unnecessary network requests every time the user changes the input
    clearTimeout(intervalRef.current);
    const timerID = setTimeout(() => {
      getPodcasts(value);
    }, 750); // 500ms should be good too
    intervalRef.current = timerID;
  };

  return (
    <div id='search-view' className='w-full'>
      <SearchBar handleSearchChange={handleSearchChange} />
      {podcasts?.length > 0 ? (
        <div data-testid='search-view-results' className='mb-4'>
          <TableResults podcasts={podcasts} headings='podcastSearch' />
        </div>
      ) : (
        <div data-testid='search-view-no-results'>
          <h1>Sorry! 0 podcast found</h1>
        </div>
      )}
    </div>
  );
};

export default Search;
