export default {
  name: "playList",
  title: "playList",
  type: "document",
  fields: [
    {
      name: "playListName",
      title: "Play List Name",
      type: "string",
    },
    {
      name: "videos",
      title: "Videos",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    },
  ],
};
