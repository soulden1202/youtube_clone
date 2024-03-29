// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { searchPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchTerm } = req.query;
    const query = searchPostsQuery(searchTerm);

    try {
      const data = await client.fetch(query);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json("SERVER_ERROR");
    }
  }
}
