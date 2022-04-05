import { Genre } from "./interfaces";

export class DiscDto {
  discId?: number;
  title: string;
  artist: string;
  releaseDate: string;
  genre: Genre;
  description: string;
  trackList: string[];
}
