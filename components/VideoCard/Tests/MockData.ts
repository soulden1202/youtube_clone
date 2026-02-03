import { Video } from "../../../types";

export const mockVideo: Video = {
  _id: "1",
  caption: "Test Video",
  description: "Test Description",
  viewCount: 100,
  createdAt: new Date().toISOString(),
  userId: "user1",
  tags: ["test"],
  uploadVideo: {
    video: {
      asset: {
        _id: "v1",
        url: "https://test.com/video.mp4",
      },
    },
    thumbnail: {
      asset: {
        url: "https://test.com/thumb.jpg",
      },
    },
  },
  postedBy: {
    _id: "user1",
    userName: "Test User",
    image: "https://test.com/user.jpg",
  },
  likes: [],
  dislikes: [],
  comments: [],
};
