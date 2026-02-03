import { IRecomendation } from './IRecomendation';

export interface IPlayListQueue {
  playListName: string;
  _key: string;
  videos: IRecomendation[];
}
