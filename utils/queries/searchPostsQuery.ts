export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || '${searchTerm}*' in tags] {
       _id,
     caption,
     createdAt,
     uploadVideo{
        video{
          asset ->{
            _id,
            url
          }
        }, 
        thumbnail{
          asset ->{
            url
          }
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
    viewCount,
  }`;
  return query;
};
