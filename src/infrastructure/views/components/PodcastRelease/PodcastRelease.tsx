import moment from 'moment';

type Props = {
  date: string | Date;
};

const PodcastRelease = ({ date }: Props) => {
  const formattedDate = moment(date).fromNow();
  return <div>{formattedDate}</div>;
};

export default PodcastRelease;
