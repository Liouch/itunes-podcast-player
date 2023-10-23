import { useMemo, useState } from 'react';
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
import PodcastRelease from '../PodcastRelease';
import TableSort from './TableSort';
import { podcastService } from '../../../../domain/services/PodcastService';
import { podcastRepository } from '../../../repositories/podcastRepository';

type Props = {
  podcasts: Podcast[];
  headings: keyof TableHeadings;
};
export type TableHeading = {
  headingTitle: string;
  sortable: boolean;
  fieldToSort?: keyof Podcast;
};
type TableHeadings = {
  podcastSearch: TableHeading[];
  podcastCollection: TableHeading[];
};

const tableHeadings: TableHeadings = {
  podcastSearch: [
    { headingTitle: '#', sortable: false },
    { headingTitle: 'Name', sortable: true, fieldToSort: 'trackName' },
    {
      headingTitle: 'Description',
      sortable: true,
      fieldToSort: 'longDescription',
    },
    { headingTitle: 'Released', sortable: true, fieldToSort: 'releaseDate' },
  ],
  podcastCollection: [
    { headingTitle: '#', sortable: false, fieldToSort: 'releaseDate' },
    { headingTitle: 'Title', sortable: true, fieldToSort: 'trackName' },
    // TODO: Check this field as we currently do not map time when we get the data
    { headingTitle: 'Topic', sortable: true, fieldToSort: 'longDescription' },
    { headingTitle: 'Released', sortable: true, fieldToSort: 'releaseDate' },
    // TODO: Check this field as we currently do not map time when we get the data
    { headingTitle: 'time', sortable: true, fieldToSort: 'releaseDate' },
  ],
};

const TableResults = ({ podcasts, headings }: Props) => {
  const [sortField, setSortField] = useState<keyof Podcast | null>(null);

  const onSort = (field: keyof Podcast) => {
    setSortField(field);
  };

  const sortedPodcasts: Podcast[] = useMemo(() => {
    return podcastService(podcastRepository()).getPodcastListSorted(
      podcasts,
      sortField
    );
  }, [podcasts, sortField]);

  return (
    <TableContainer component={Paper} className='bg-[var(--bg-color)]'>
      <div className='flex justify-end mt-4 pr-0'>
        <TableSort sortFields={tableHeadings[headings]} onSort={onSort} />
      </div>
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
      >
        <TableHead>
          <TableRow>
            {tableHeadings[headings].map((heading) => (
              <TableCell key={heading.headingTitle}>
                {heading.headingTitle}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPodcasts.map((podcast) => (
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
              <TableCell sx={{ paddingRight: '60px' }}>
                <PodcastDescription description={podcast.longDescription} />
              </TableCell>
              <TableCell sx={{ minWidth: '120px' }}>
                <PodcastRelease date={podcast.releaseDate} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableResults;
