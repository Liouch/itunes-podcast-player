import { render, screen } from '@testing-library/react';
import PlayPauseButton from './PlayPauseButton';

test('renders PlayPauseButton component', () => {
  render(<PlayPauseButton icon='play' size='small' />);

  const playPauseButton = screen.getByTestId('PlayPauseButton');

  expect(playPauseButton).toBeInTheDocument();
});

test('renders PlayPauseButton component with small Play icon', () => {
  render(<PlayPauseButton icon='play' size='small' />);

  const playButton = screen.getByTestId('playIcon');

  expect(playButton).toBeInTheDocument();
  expect(playButton).toHaveClass('text-4xl');
});

test('renders PlayPauseButton component with large Pause icon', () => {
  render(<PlayPauseButton icon='pause' size='large' />);

  const pauseButton = screen.getByTestId('pauseIcon');

  expect(pauseButton).toBeInTheDocument();

  expect(pauseButton).toHaveClass('text-5xl');
  expect(pauseButton).toHaveStyle(
    'background-color: var(--secondary-botton-color)'
  );
  expect(pauseButton).toHaveClass('rounded-full');
});
