import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { allPostsQuery, topicPostsQuery } from "../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { tags, id } = req.body;
      console.log(tags);
      const query = topicPostsQuery(tags, id);

      const data = await client.fetch(query);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
