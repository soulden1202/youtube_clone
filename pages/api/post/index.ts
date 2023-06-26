// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery, postDetailQuery } from "../../../utils/queries";

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    try {
      const query = allPostsQuery();

      const data = await client.fetch(query);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "POST") {
    if (!session) {
      res.status(404).json("User not found");
    } else if (session.user.id !== req.body.userId) {
      res.status(401).json("Unauthorized");
    } else {
      const docs = req.body;
      client.create(docs).then(() => res.status(201).json("Video Created"));
    }
  } else if (req.method === "PATCH") {
    const { id } = req.body;

    client
      .patch(id)
      .inc({ viewCount: 1 })
      .commit()
      .then(() => {
        res.status(200).json("View count updated");
      })
      .catch(() => {
        res.status(500).json("Error updating video");
      });
  } else if (req.method === "DELETE") {
    const { id, userProfile } = req.body;

    if (!userProfile || !session) {
      res.status(404).json("User not found");
    } else if (userProfile.id !== session.user.id) {
      res.status(401).json("Unauthorized");
    } else {
      const document = await client.getDocument(id);

      if (!document) {
        res.status(404).json("Video not found");
      } else {
        if (userProfile.id !== document.userId) {
          res.status(409).json("Failed to delete");
        } else {
          client
            .delete(id)
            .then(() => {
              res.status(200).json("Video is deleted");
            })
            .catch(() => {
              res.status(500).json("Can't delete video");
            });
        }
      }
    }
  }
}
