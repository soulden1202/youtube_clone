export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "userName",
      title: "User Name",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "string",
    },
    {
      name: "liked",
      title: "Liked",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
    },
    {
      name: "disliked",
      title: "Disliked",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
    },

    {
      name: "playLists",
      title: "Play Lists",
      type: "array",
      of: [{ type: "playList" }],
    },
  ],
};
