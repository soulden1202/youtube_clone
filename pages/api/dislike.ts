// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { uuid } from "uuidv4";
import { postDetailQuery } from "../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, postId, dislike } = req.body;

    if (dislike === true) {
      await client
        .patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
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

      res.status(200).json(data);
    } else if (dislike === false) {
      const data = await client
        .patch(postId)
        .unset([`dislikes[_ref=="${userId}"]`])
        .commit();

      res.status(200).json(data);
    }
  }
}
