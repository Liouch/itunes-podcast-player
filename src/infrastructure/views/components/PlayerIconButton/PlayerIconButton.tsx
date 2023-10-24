import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReplayIcon from '@mui/icons-material/Replay';

type Props = {
  icon: 'play' | 'pause' | 'shuffle' | 'skipPrevious' | 'skipNext' | 'replay';
  size: 'small' | 'large';
  onClick?: () => void;
};

const PlayerIconButton = ({ icon, size, onClick }: Props) => {
  const sizes = {
    small: 'text-4xl',
    large: 'md:text-3xl lg:text-4xl xl:text-5xl',
  };
  const icons = {
    play: (
      <PlayArrowRoundedIcon className={sizes[size]} data-testid='playIcon' />
    ),
    pause: (
      <PauseIcon
        className={`p-2 bg-[var(--secondary-botton-color)] rounded-full ${sizes[size]}`}
        data-testid='pauseIcon'
      />
    ),
    shuffle: <ShuffleIcon className={sizes[size]} data-testid='shuffleIcon' />,
    skipPrevious: (
      <SkipPreviousIcon
        className={sizes[size]}
        data-testid='skipPreviousIcon'
      />
    ),
    skipNext: (
      <SkipNextIcon className={sizes[size]} data-testid='skipNextIcon' />
    ),

    replay: <ReplayIcon className={sizes[size]} data-testid='replayIcon' />,
  };
  return (
    <IconButton
      aria-label={icon}
      size='large'
      onClick={onClick}
      className='text-white md:p-1 lg:p-2 xl:p-4'
      data-testid='PlayerIconButton'
    >
      {icons[icon]}
    </IconButton>
  );
};

export default PlayerIconButton;
