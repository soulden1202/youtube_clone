import { array } from "prop-types";

export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "uploadVideo",
      title: "Upload Video",
      type: "object",
      fields: [
        {
          name: "video",
          title: "Video",
          type: "file",
          options: {
            hotspot: true,
          },
        },
        {
          name: "thumbnail",
          title: "Thumbnail",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },

    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy",
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },

    {
      name: "dislikes",
      title: "Dislikes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comment" }],
    },
    {
      name: "topic",
      title: "Topic",
      type: "string",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },

    {
      name: "description",
      title: "Description",
      type: "string",
    },

    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },

    {
      name: "viewCount",
      title: "View Count",
      type: "number",
    },
  ],
  initialValue: () => ({
    createdAt: new Date().toISOString(),
    viewCount: 0,
  }),
};
