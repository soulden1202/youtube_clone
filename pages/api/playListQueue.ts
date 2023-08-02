// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserPlayListQueue } from "../../utils/queries";

import { client } from "../../utils/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    const { userId, playListId } = req.body;

    if (!session) {
      res.status(404).json("User not found");
    } else if (session.user.id !== userId) {
      res.status(401).json("Unauthorized");
    } else {
      try {
        const query = getUserPlayListQueue(userId, playListId);

        const data = await client.fetch(query);

        var newData = data[0].playLists.filter(
          (value: any) => Object.keys(value).length !== 0
        );

        res.status(200).json(newData);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  }
}
