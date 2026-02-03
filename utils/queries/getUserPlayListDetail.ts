export const getUserPlayListDetail = (userId: string, key: string) => {
  const query = `*[_type == "user" && _id == '${userId}']{
     playLists[]{
   _key == '${key}' =>{
     playListName,
     _key,
   videos[]->{
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
 }
 },
   }`;
  return query;
};
