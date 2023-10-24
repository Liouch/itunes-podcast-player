import {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { GlobalState } from '../../../domain/models/GlobalState';

type PodcastGlobalProviderProps = { children: React.ReactNode };

export type PodcastContextType = {
  podcastsGlobalInfo: GlobalState;
  setPodcastsGlobalInfo: Dispatch<SetStateAction<GlobalState>>;
};
export const PodcastContext = createContext<PodcastContextType | undefined>(
  undefined
);

const usePodcast = (): PodcastContextType => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error(`usePodcast must be used within a PodcastGlobalProvider`);
  }
  return context;
};

const PodcastGlobalProvider = ({ children }: PodcastGlobalProviderProps) => {
  const [podcastsGlobalInfo, setPodcastsGlobalInfo] = useState<GlobalState>({
    podcastList: [],
    activeTrackId: null,
    isTrackPlaying: false,
  });
  const value = useMemo(() => {
    return {
      podcastsGlobalInfo,
      setPodcastsGlobalInfo,
    };
  }, [podcastsGlobalInfo]);
  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
};

export { PodcastGlobalProvider, usePodcast };
