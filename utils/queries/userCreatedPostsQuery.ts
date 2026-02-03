export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == "post" && userId == '${userId}'] | order(_createdAt desc){
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
    tags,
    description
  }`;

  return query;
};
