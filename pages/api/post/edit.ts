// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "PUT") {
    const { postId, caption, description, imageAsset, tags } = req.body;

    const doc = await client.getDocument(postId);

    if (!doc) {
      return res.status(404).json("No video found");
    } else if (!session) {
      return res.status(404).json("No user found");
    } else if (session.user.id !== doc.userId) {
      return res.status(401).json("Unauthorized");
    } else {
    }

    if (imageAsset) {
      await client
        .patch(postId)
        .set({
          caption: caption,
          description: description,
          tags: tags,
          uploadVideo: {
            video: { _type: "file", asset: doc.uploadVideo.video.asset },
            thumbnail: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageAsset?._id,
              },
            },
          },
        })

        .commit()
        .then((response) => {
          res.status(200).json(response.message);
        })
        .catch((error) => {
          res.status(500).json(error.message);
        });
    } else {
      await client
        .patch(postId)
        .set({
          caption: caption,
          description: description,
          tags: tags,
        })

        .commit()
        .then((response) => {
          res.status(200).json(response.message);
        })
        .catch((error) => {
          res.status(500).json(error.message);
        });
    }
  }
}
