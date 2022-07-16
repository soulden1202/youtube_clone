// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const query = allPostsQuery();

      const data = await client.fetch(query);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "POST") {
    const docs = req.body;
    client.create(docs).then(() => res.status(201).json("Video Created"));
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
  }
}
