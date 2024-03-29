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

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

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
