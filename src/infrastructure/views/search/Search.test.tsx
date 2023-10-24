import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Search from './Search';
import {
  PodcastContext,
  PodcastContextType,
} from '../contexts/PodcastGlobalContext';

import * as React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const value: PodcastContextType = {
    podcastsGlobalInfo: {
      podcastList: [],
      activeTrackId: null,
      isTrackPlaying: false,
    },
    setPodcastsGlobalInfo: jest.fn(),
  };
  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
};

test('renders Search view', () => {
  const { container } = render(
    <Wrapper>
      <Search />
    </Wrapper>
  );
  const searchContainer = container.querySelector('#search-view');
  expect(searchContainer).toBeInTheDocument();
});

test('renders initial search view with no podcast results', () => {
  render(
    <Wrapper>
      <Search />
    </Wrapper>
  );
  const noPodcastMessage = screen.getByText(/Sorry! 0 podcast found/i);
  expect(noPodcastMessage).toBeInTheDocument();
});

test('renders search view with no podcast results when user types input empty', async () => {
  render(
    <Wrapper>
      <Search />
    </Wrapper>
  );
  const searchInput = screen.getByPlaceholderText(/search podcast/i);
  act(() => {
    fireEvent.change(searchInput, { target: { value: '' } });
  });
  await waitFor(() => {
    const resultsContainer = screen.getByTestId('search-view-no-results');
    expect(resultsContainer).toBeInTheDocument();
  });
});
test('renders search view with results when user searches for a podcast', async () => {
  render(
    <Wrapper>
      <Search />
    </Wrapper>
  );
  const searchInput = screen.getByPlaceholderText(/search podcast/i);

  act(() => {
    fireEvent.change(searchInput, { target: { value: 'test' } });
  });
  await waitFor(
    () => {
      const resultsContainer = screen.getByTestId('search-view-results');
      expect(resultsContainer).toBeInTheDocument();
    },
    { timeout: 3000 }
  );
});
