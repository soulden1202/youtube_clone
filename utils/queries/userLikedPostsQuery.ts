export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'user' && _id == '${userId}'] {

    liked[]->{
      _id,
      viewCount,
      caption,
      createdAt,
      uploadVideo{thumbnail{
          asset ->{
            url
          } }
    }

}
  }`;

  return query;
};
