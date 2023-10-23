import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Podcast } from '../../../../domain/models/Podcast';
import { TableHeading } from './TableResults';

type Props = {
  sortFields: TableHeading[];
  onSort: (param: keyof Podcast) => void;
};
const TableSort = ({ sortFields, onSort }: Props) => {
  const [sortField, setSortField] = useState<string>('');

  const filteredSortableFields = sortFields.filter((field) => field.sortable);

  const onSelectChange = (e: SelectChangeEvent) => {
    setSortField(e.target.value);
    onSort(e.target.value as keyof Podcast);
  };

  return (
    <FormControl
      sx={{ minWidth: 130 }}
      size='small'
      className='bg-[var(--bg-color-lighter)] text-white'
    >
      <InputLabel id='demo-select-small-label' className='text-white'>
        <span className='flex items-center'>
          <SearchIcon />
          <span>Sort by</span>
        </span>
      </InputLabel>
      <Select
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={sortField}
        label='Sort by'
        onChange={onSelectChange}
        className='text-white'
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {filteredSortableFields.map((field) => (
          <MenuItem value={field.fieldToSort} key={field.headingTitle}>
            {field.headingTitle}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TableSort;
