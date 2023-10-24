import { render, screen } from '@testing-library/react';
import PlayerIconButton from './PlayerIconButton';

test('renders PlayerIconButton component', () => {
  render(<PlayerIconButton icon='play' size='small' />);

  const playerIconButton = screen.getByTestId('PlayerIconButton');

  expect(playerIconButton).toBeInTheDocument();
});

test('renders PlayerIconButton component with small Play icon', () => {
  render(<PlayerIconButton icon='play' size='small' />);

  const playButton = screen.getByTestId('playIcon');

  expect(playButton).toBeInTheDocument();
  expect(playButton).toHaveClass('text-4xl');
});

test('renders PlayerIconButton component with large Pause icon', () => {
  render(<PlayerIconButton icon='pause' size='large' />);

  const pauseButton = screen.getByTestId('pauseIcon');

  expect(pauseButton).toBeInTheDocument();

  expect(pauseButton).toHaveClass('xl:text-5xl');
  expect(pauseButton).toHaveStyle(
    'background-color: var(--secondary-botton-color)'
  );
  expect(pauseButton).toHaveClass('rounded-full');
});
