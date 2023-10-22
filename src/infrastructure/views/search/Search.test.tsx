import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Search from './Search';

test('renders Search view', () => {
  const { container } = render(<Search />);
  const searchContainer = container.querySelector('#search-view');
  expect(searchContainer).toBeInTheDocument();
});

test('renders initial search view with no podcast results', () => {
  render(<Search />);
  const noPodcastMessage = screen.getByText(/Sorry! 0 podcast found/i);
  expect(noPodcastMessage).toBeInTheDocument();
});

test('renders search view with no podcast results when user types input empty', async () => {
  render(<Search />);
  const searchInput = screen.getByPlaceholderText(/search podcast/i);
  act(() => {
    fireEvent.change(searchInput, { target: { value: '' } });
  });
  await waitFor(
    () => {
      const resultsContainer = screen.getByTestId('search-view-no-results');
      expect(resultsContainer).toBeInTheDocument();
    },
    { timeout: 3000 }
  );
});

test('renders search view with results when user searches for a podcast', async () => {
  render(<Search />);
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
