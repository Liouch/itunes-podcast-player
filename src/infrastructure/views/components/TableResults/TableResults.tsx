import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Podcast } from '../../../../domain/models/Podcast';
import PlayPauseButton from '../PlayPauseButton';
import PodcastSummary from '../PodcastSummary';
import PodcastDescription from '../PodcastDescription';

type Props = {
  podcasts?: Podcast[];
  headings: keyof TableHeadings;
};
type TableHeadings = {
  podcastSearch: string[];
  podcastCollection: string[];
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const tableHeadings = {
  podcastSearch: ['#', 'Name', 'Description', 'Released'],
  podcastCollection: ['#', 'Title', 'Topic', 'Released', 'time'],
};

const TableResults = ({ podcasts, headings }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          'td, th': {
            color: '#707070',
            borderColor: '#5A5A5E',
          },
          tr: {
            minHeight: '75px',
            height: '75px',
          },
        }}
        aria-label='simple table'
        className='bg-[var(--bg-color)]'
      >
        <TableHead>
          <TableRow>
            {tableHeadings[headings].map((heading) => (
              <TableCell key={heading}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {podcasts?.map((podcast) => (
            <TableRow
              key={podcast.trackId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                sx={{ minWidth: '75px', padding: '0', textAlign: 'center' }}
              >
                <PlayPauseButton size='small' icon='pause' />
              </TableCell>
              <TableCell sx={{ minWidth: '400px', paddingRight: '60px' }}>
                <PodcastSummary
                  media={podcast.artworkUrl600}
                  artistName={podcast.artistName}
                  trackName={podcast.trackName}
                />
              </TableCell>
              <TableCell>
                <PodcastDescription description={podcast.longDescription} />
              </TableCell>
              <TableCell>{podcast.releaseDate.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableResults;
