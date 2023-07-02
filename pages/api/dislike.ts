// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { uuid } from "uuidv4";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, postId, dislike } = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(404).json("User not found");
    } else if (session.user.id !== req.body.userId) {
      res.status(401).json("Unauthorized");
    } else {
      if (dislike === true) {
        await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

        await client
          .patch(session.user.id)
          .unset([`liked[_ref=="${postId}"]`])
          .commit();

        const data = await client
          .patch(postId)
          .setIfMissing({ dislikes: [] })
          .insert("after", "dislikes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit();

        await client
          .patch(session.user.id)
          .setIfMissing({ disliked: [] })
          .insert("after", "disliked[-1]", [
            {
              _key: uuid(),
              _ref: postId,
            },
          ])
          .commit();

        res.status(200).json(data);
      } else if (dislike === false) {
        const data = await client
          .patch(postId)
          .unset([`dislikes[_ref=="${userId}"]`])
          .commit();

        await client
          .patch(session.user.id)
          .unset([`disliked[_ref=="${postId}"]`])
          .commit();

        res.status(200).json(data);
      }
    }
  }
}
