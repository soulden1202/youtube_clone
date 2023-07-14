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
    _key: string;
    _ref: string;
  }[];

  dislikes: {
    _key: string;
    _ref: string;
  }[];
  comments: {
    comment: string;
    _key: string;
    commentAt: string;
    postedBy: {
      _ref: string;
      userName: string;
      image: string;
      _id: string;
    };
  }[];
  userId: string;
  description: string;
}

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
  _id: string;
  createdAt: string;
  viewCount: number;
  postedBy: {
    userName: string;
  };
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}
