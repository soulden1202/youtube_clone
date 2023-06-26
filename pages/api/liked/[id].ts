import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { userLikedPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const query = userLikedPostsQuery(id);

      const data = await client.fetch(query);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json("SERVER_ERROR");
    }
  }
}
