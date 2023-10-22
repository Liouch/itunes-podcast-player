import { useCallback, useState, useRef } from 'react';
import { Podcast } from '../../../domain/models/Podcast';
import { podcastService } from '../../../domain/services/PodcastService';
import { podcastRepository } from '../../repositories/podcastRepository';
import SearchBar from '../components/SearchBar/SearchBar';
import TableResults from '../components/TableResults';
const results = [
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1504822434,
    trackId: 1504822434,
    artistName: 'Alexwood',
    collectionName: '别任性｜Be A Dodo',
    trackName: '别任性｜Be A Dodo',
    releaseDate: '2023-09-17T00:16:00Z',
    primaryGenreName: 'Leisure',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/59/d1/bb/59d1bb97-0e56-2f18-579f-fe9e2296f9db/mza_62523024229238493.jpeg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 591291102,
    trackId: 591291102,
    artistName: 'a',
    collectionName: 'a',
    trackName: 'a',
    releaseDate: '2013-08-17T06:41:00Z',
    primaryGenreName: 'Comedy',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/ec/12/59/ec125937-5d15-487b-6878-5faa4923839b/mza_16803236629077062816.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1125332491,
    trackId: 1125332491,
    artistName: 'MBC',
    collectionName: "굿모닝FM '클래식 A-Yo'  (종영)",
    trackName: "굿모닝FM '클래식 A-Yo'  (종영)",
    releaseDate: '2017-12-25T22:00:00Z',
    primaryGenreName: 'Music',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/c3/12/e9/c312e914-472c-ffed-ef55-e85cabfa6197/mza_15015758751039514292.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1523066220,
    trackId: 1523066220,
    artistName: 'A Bouquet of Arguments',
    collectionName: '杠上开花 A Bouquet of Arguments',
    trackName: '杠上开花 A Bouquet of Arguments',
    releaseDate: '2023-09-21T03:40:00Z',
    primaryGenreName: 'Careers',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/a2/b8/06/a2b806ab-3e05-6f2d-8138-3ce58904b62a/mza_8466548383994674562.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1479851581,
    trackId: 1479851581,
    artistName: 'anobody.im',
    collectionName: '小人物 A Nobody',
    trackName: '小人物 A Nobody',
    releaseDate: '2022-11-16T09:00:00Z',
    primaryGenreName: 'Self-Improvement',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/05/5c/50/055c50a8-d483-af7a-4053-764b52c03bc7/mza_11273418536178973868.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1501309469,
    trackId: 1501309469,
    artistName: 'Cindy & Jason',
    collectionName: '不浪漫故事 Not A Romantic Story',
    trackName: '不浪漫故事 Not A Romantic Story',
    releaseDate: '2023-10-17T18:23:00Z',
    primaryGenreName: 'Leisure',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/26/a3/14/26a31453-e175-e31e-2f36-ee2cbb9e66d3/mza_7199857762805384633.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1064007472,
    trackId: 1064007472,
    artistName: '민킴',
    collectionName: '민킴의 One a Day (스페인어&영어, 이젠 소리로 익히자)',
    trackName: '민킴의 One a Day (스페인어&영어, 이젠 소리로 익히자)',
    releaseDate: '2020-11-19T06:49:00Z',
    primaryGenreName: 'Education',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/fa/58/b8/fa58b84d-c199-6c39-0e62-1d609bbfd7be/mza_1034181884418800859.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1542620581,
    trackId: 1542620581,
    artistName: 'Korean teacher 한국어 한 조각',
    collectionName: '한국어 한 조각 Korean teacher A piece of Korean',
    trackName: '한국어 한 조각 Korean teacher A piece of Korean',
    releaseDate: '2023-10-19T00:00:00Z',
    primaryGenreName: 'Language Learning',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/14/6c/8c/146c8cc1-522d-b615-17dc-1244aa10d06d/mza_15022763696608974812.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1531436116,
    trackId: 1531436116,
    artistName: 'A.Piece.of.Korean,한국어한조각',
    collectionName: '한국어 한 조각 a Piece of Korean',
    trackName: '한국어 한 조각 a Piece of Korean',
    releaseDate: '2020-10-04T04:23:00Z',
    primaryGenreName: 'Education',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/6b/ee/16/6bee16c7-028f-8a49-1b41-7187559b3e23/mza_5505311820175933210.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 896497589,
    trackId: 896497589,
    artistName: 'Chloe Doyeon',
    collectionName: '마케팅, 글로벌 비즈니스 전략 : Not A But B Strategy',
    trackName: '마케팅, 글로벌 비즈니스 전략 : Not A But B Strategy',
    releaseDate: '2018-03-25T22:00:00Z',
    primaryGenreName: 'Business',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/cb/cd/34/cbcd342c-b5a6-7ffd-a8c8-9d7d1f0d0cc2/mza_6785646122763709701.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1493193874,
    trackId: 1493193874,
    artistName: 'Lee, Wei-Jean 咕咕老師',
    collectionName: '聽故事 Listen! A story! 聽故事',
    trackName: '聽故事 Listen! A story! 聽故事',
    releaseDate: '2023-10-20T10:06:00Z',
    primaryGenreName: 'Stories for Kids',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/14/5b/73/145b733a-8e01-af82-fa2c-248729ac2777/mza_5699433154455829873.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1583407085,
    trackId: 1583407085,
    artistName: 'NewsPicks',
    collectionName: 'a scope ~リベラルアーツで世界を視る目が変わる~',
    trackName: 'a scope ~リベラルアーツで世界を視る目が変わる~',
    releaseDate: '2021-12-25T21:00:00Z',
    primaryGenreName: 'Social Sciences',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/e2/2e/c8/e22ec869-86de-72d3-7117-b1391f2768c9/mza_5679646584284746494.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1514491744,
    trackId: 1514491744,
    artistName: 'justfont',
    collectionName: '字型腦補 A Knob of Font',
    trackName: '字型腦補 A Knob of Font',
    releaseDate: '2021-12-23T00:30:00Z',
    primaryGenreName: 'Design',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts114/v4/4b/0d/5d/4b0d5d2e-f304-ccb3-0f90-969f6306398d/mza_6810263769015530675.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1447788728,
    trackId: 1447788728,
    artistName: 'Asami and Yurie',
    collectionName: 'A and Y Podcast サンフランシスコから女子トーク',
    trackName: 'A and Y Podcast サンフランシスコから女子トーク',
    releaseDate: '2023-09-16T02:57:00Z',
    primaryGenreName: 'Fashion & Beauty',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/b0/11/85/b0118534-2ab8-d27b-e2c3-5b3a3b0ae3af/mza_17785972643999022935.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1363821791,
    trackId: 1363821791,
    artistName: 'rōmaji.co',
    collectionName: 'Under One Roof a Terrace House Party。',
    trackName: 'Under One Roof a Terrace House Party。',
    releaseDate: '2019-06-03T15:00:00Z',
    primaryGenreName: 'TV & Film',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/96/5f/98/965f98b7-9ac5-ad1d-3af0-c8ec1f0ce97d/mza_7384089044885195118.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 677420279,
    trackId: 677420279,
    artistName: 'オンラインフランス語学校　アンサンブル アン フランセ',
    collectionName: "A la Cafet' 旬のフランス・フランス語学習方法をご紹介",
    trackName: "A la Cafet' 旬のフランス・フランス語学習方法をご紹介",
    releaseDate: '2023-10-19T15:00:00Z',
    primaryGenreName: 'Language Learning',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/9b/69/bb/9b69bb81-03f6-84da-ca16-0e597b1a0e14/mza_15173148481650312052.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1536372620,
    trackId: 1536372620,
    artistName: 'MBSラジオ',
    collectionName: 'AマッソのMBSヤングタウン',
    trackName: 'AマッソのMBSヤングタウン',
    releaseDate: '2023-10-11T15:00:00Z',
    primaryGenreName: 'Society & Culture',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/3f/d4/16/3fd41635-0fdf-4fcc-2c1f-f096212a8b8e/mza_11958042676753796838.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1546029323,
    trackId: 1546029323,
    artistName: 'Janice Liu',
    collectionName: 'A佳走踏美國',
    trackName: 'A佳走踏美國',
    releaseDate: '2022-05-26T03:42:00Z',
    primaryGenreName: 'Society & Culture',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts124/v4/a8/c1/48/a8c148dc-ea39-4532-75a0-ddfa7a244b93/mza_11286417788110266555.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1513530055,
    trackId: 1513530055,
    artistName: '채널A',
    collectionName: '뉴스A',
    trackName: '뉴스A',
    releaseDate: '2023-10-20T00:00:00Z',
    primaryGenreName: 'News',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/92/dc/fb/92dcfba1-1a64-f542-96a5-89d15d1f144e/mza_14926592113438307006.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1490374590,
    trackId: 1490374590,
    artistName: 'y2intelligences',
    collectionName: 'Mind a Bit | 基智一点',
    trackName: 'Mind a Bit | 基智一点',
    releaseDate: '2020-12-31T03:44:00Z',
    primaryGenreName: 'Science',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/3c/db/9f/3cdb9f5e-11b2-5c4b-a389-3e1cfbc8b3c6/mza_9706203968326659452.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1180395756,
    trackId: 1180395756,
    artistName: 'diffengine.org',
    collectionName: '差分机 | A Difference Engine',
    trackName: '差分机 | A Difference Engine',
    releaseDate: '2018-05-03T02:08:00Z',
    primaryGenreName: 'Technology',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/fc/28/b4/fc28b4b8-7067-c3b8-6a63-81de15d4f525/mza_8380431825609817674.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1554003528,
    trackId: 1554003528,
    artistName: '0jin0',
    collectionName: '영화진흥공화국 a.k.a 영진공',
    trackName: '영화진흥공화국 a.k.a 영진공',
    releaseDate: '2022-03-23T22:48:00Z',
    primaryGenreName: 'TV & Film',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/9e/e8/6c/9ee86cd0-0a79-da68-de97-9f1068a52abe/mza_7291551939584930705.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1100248135,
    trackId: 1100248135,
    artistName: '[A]',
    collectionName: 'Towards a Smarter World',
    trackName: 'Towards a Smarter World',
    releaseDate: '2023-04-05T16:09:00Z',
    primaryGenreName: 'Technology',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/0b/59/32/0b593296-7cb5-0539-d88d-306d34e353f0/mza_5787903784369425377.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1537537990,
    trackId: 1537537990,
    artistName: 'a.',
    collectionName: 'A True Crime Weekly: Speak No Evil',
    trackName: 'A True Crime Weekly: Speak No Evil',
    releaseDate: '2020-10-27T06:14:00Z',
    primaryGenreName: 'True Crime',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts114/v4/59/5d/ec/595dec6d-bc0b-e0fb-6335-e27210907e89/mza_6919524728136536108.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 993538960,
    trackId: 993538960,
    artistName: '아시아투데이',
    collectionName: '아투톡톡 - A기자 연애학개론',
    trackName: '아투톡톡 - A기자 연애학개론',
    releaseDate: '2015-09-11T08:08:00Z',
    primaryGenreName: 'Comedy',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/be/ed/2b/beed2b8b-b8d3-6149-3361-ea4aa6f3bdbc/mza_1356085813759712763.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1516490995,
    trackId: 1516490995,
    artistName: 'Jashin & Hilary',
    collectionName: '一英里的碎碎念 | A Mile Long Chitchat',
    trackName: '一英里的碎碎念 | A Mile Long Chitchat',
    releaseDate: '2021-04-28T05:59:00Z',
    primaryGenreName: 'Careers',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/6c/22/8a/6c228af7-8e10-7ad6-6980-d7d558c6b42a/mza_3476151080238353584.jpg/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 382503248,
    trackId: 382503248,
    artistName: 'A',
    collectionName: 'MAR☆BINのPodcast!!!',
    trackName: 'MAR☆BINのPodcast!!!',
    releaseDate: '2010-12-25T06:34:00Z',
    primaryGenreName: 'Music',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Features/v4/5f/88/96/5f8896e9-9be5-529a-af14-cc807367568a/mza_1382744875394257421.png/600x600bb.jpg',
  },
  {
    wrapperType: 'track',
    kind: 'podcast',
    collectionId: 1531252882,
    trackId: 1531252882,
    artistName: 'AMC空中美語',
    collectionName: 'A+ English 空中美語',
    trackName: 'A+ English 空中美語',
    releaseDate: '2023-10-19T22:00:00Z',
    primaryGenreName: 'Education',
    artworkUrl600:
      'https://is1-ssl.mzstatic.com/image/thumb/Podcasts124/v4/53/ef/b1/53efb11c-3655-aa13-7cc6-8fd2c42c9f5a/mza_76072318923767286.jpeg/600x600bb.jpg',
  },
];

const Search = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  // This intervarlRef is used to store the interval between renders
  const intervalRef = useRef<ReturnType<typeof setTimeout> | number>(0);

  const getPodcasts = useCallback(async (value: string) => {
    try {
      const responsePodcasts = await podcastService(
        podcastRepository()
      ).getPodcastList(value);
      setPodcasts(responsePodcasts);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSearchChange = (value: string) => {
    if (value === '') {
      setPodcasts([]);
      return;
    }
    // Debounce to avoid unnecessary network requests every time the user changes the input
    clearTimeout(intervalRef.current);
    const timerID = setTimeout(() => {
      getPodcasts(value);
    }, 750); // 500ms should be good too
    intervalRef.current = timerID;
  };

  return (
    <div id='search-view' className='w-full'>
      <SearchBar handleSearchChange={handleSearchChange} />
      <div data-testid='search-view-results' className='mt-4'>
        <TableResults podcasts={results} headings='podcastSearch' />
      </div>
      {/* {podcasts?.length > 0 ? (
        <div data-testid='search-view-results' className='mb-4'>
          <TableResults podcasts={podcasts} />
        </div>
      ) : (
        <div data-testid='search-view-no-results'>
          <h1>Sorry! 0 podcast found</h1>
        </div>
      )} */}
    </div>
  );
};

export default Search;
