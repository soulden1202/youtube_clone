export interface Video {
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
  _id: string;
  tags: string[];
  createdAt: string;
  viewCount: number;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];

  dislikes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  userId: string;
  description: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}
