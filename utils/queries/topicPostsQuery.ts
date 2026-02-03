export const topicPostsQuery = (tags: string | string[], id: string) => {
  let temp = "";

  for (let i = 0; i < tags.length; i++) {
    if (i == tags.length - 1) {
      temp = temp + ` "${tags[i]}" in tags`;
    } else {
      temp = temp + ` "${tags[i]}" in tags ||`;
    }
  }

  const query = `*[_type == "post" && _id != '${id}' && (${temp})] {
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
        userName,
      },
    viewCount,
    
  }`;

  return query;
};
