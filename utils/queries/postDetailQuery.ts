export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']{
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
      },
      userId,
      viewCount,
    postedBy->{
      _id,
      userName,
      image
    },
     likes,
     dislikes,
     description,
     tags,
    comments[]{
      comment,
      _key,
      commentAt,
      postedBy->{
        _ref,
      _id,
      userName,
      image     
    },
    }
  }`;
  return query;
};
