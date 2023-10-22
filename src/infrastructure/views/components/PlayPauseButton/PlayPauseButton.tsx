import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/Pause';

type Props = {
  icon: 'play' | 'pause';
  size: 'small' | 'large';
  onClick?: () => void;
};

const PlayPauseButton = ({ icon, size }: Props) => {
  const sizes = {
    small: 'text-4xl',
    large: 'text-5xl',
  };
  const icons = {
    play: (
      <PlayArrowRoundedIcon
        className={`${sizes[size]}`}
        data-testid='playIcon'
      />
    ),
    pause: (
      <PauseIcon
        className={`p-2 bg-[var(--secondary-botton-color)] rounded-full ${sizes[size]}`}
        data-testid='pauseIcon'
      />
    ),
  };
  return (
    <IconButton
      aria-label={icon}
      size='large'
      // onClick={onHandleClick}
      className='text-white'
      data-testid='PlayPauseButton'
    >
      {icons[icon]}
    </IconButton>
  );
};

export default PlayPauseButton;
