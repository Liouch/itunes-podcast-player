import { useState } from 'react';
import { FormControl, Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  handleSearchChange?: (parma: string) => void;
};

const SearchBar = ({ handleSearchChange }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSearchChange && handleSearchChange(e.target.value);
  };
  return (
    <FormControl
      variant='standard'
      className='w-full bg-[var(--bg-color-lighter)] rounded-lg'
    >
      <Input
        disableUnderline={true}
        id='search-bar-input'
        placeholder='Search Podcast'
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon sx={{ color: '#ffffff' }} />
          </InputAdornment>
        }
        sx={{ color: 'var(--text-color)' }}
        className='p-2'
        type='text'
        value={searchValue}
        onChange={onInputChange}
        name='search-bar-input'
      />
    </FormControl>
  );
};

export default SearchBar;
