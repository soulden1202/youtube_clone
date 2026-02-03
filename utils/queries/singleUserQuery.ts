export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};
