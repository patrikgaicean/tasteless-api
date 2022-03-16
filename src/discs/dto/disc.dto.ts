export class DiscDto {
  discId?: number;
  title: string;
  artist: string;
  releaseDate: string;
  genre: string; // TODO change to enum
  description: string;
  trackList: string[];
  images: number[];
}
