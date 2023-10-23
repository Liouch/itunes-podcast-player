export interface Podcast {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  releaseDate: Date | string;
  primaryGenreName: string;
  artworkUrl600: string;
  longDescription?: string;
  trackTimeMillis?: number;
}
