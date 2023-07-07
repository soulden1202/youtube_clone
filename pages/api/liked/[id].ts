import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { userLikedPostsQuery } from "../../../utils/queries";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      if (!session) {
        return res.status(404).json("No user found");
      } else if (session.user.id !== id) {
        return res.status(401).json("Unauthorized");
      }

      const query = userLikedPostsQuery(id);

      const data = await client.fetch(query);

      res.status(200).json(data[0].liked);
    } catch (error) {
      res.status(500).json("SERVER_ERROR");
    }
  }
}
