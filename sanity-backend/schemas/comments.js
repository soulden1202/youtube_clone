export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "postedBy",
      title: "UPosted By",
      type: "postedBy",
    },
    {
      name: "comment",
      title: "Comment",
      type: "string",
    },
    {
      name: "commentAt",
      title: "Comment At",
      type: "datetime",
    },
  ],
  initialValue: () => ({
    commentAt: new Date().toISOString(),
  }),
};
