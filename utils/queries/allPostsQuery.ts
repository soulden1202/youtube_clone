export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
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
