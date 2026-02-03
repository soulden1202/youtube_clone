export const getUserPlayListQueue = (userId: string, key: string) => {
  const query = `*[_type == "user" && _id == '${userId}']{
     playLists[]{
   _key == '${key}' =>{
     playListName,
     _key,
   videos[]->{
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
    }
   }
 
 },
   }`;
  return query;
};
