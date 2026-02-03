export const getUserPlayLists = (userId: string) => {
  const query = `*[_type == "user" && _id == '${userId}']{
    playLists[]{
      playListName,
      _key,
      videos[]->{
        _id
      }
    }
   }`;
  return query;
};
