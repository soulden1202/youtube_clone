export interface IRecomendation {
  _id: string;
  caption: string;
  uploadVideo: {
    video: {
      asset: {
        _id: string;
        url: string;
      };
    };
    thumbnail: {
      asset: {
        url: string;
      };
    };
  };
  createdAt: string;
  viewCount: number;
  postedBy: {
    userName: string;
  };
}
