// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserPlayListDetail } from "../../../utils/queries";

import { client } from "../../../utils/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    const { playListId } = req.query;
    const { userId } = req.body;

    if (!session) {
      res.status(404).json("User not found");
    } else if (session.user.id !== userId) {
      res.status(401).json("Unauthorized");
    } else {
      try {
        const query = getUserPlayListDetail(
          userId.toString(),
          playListId.toString()
        );

        const data = await client.fetch(query);

        var newData = data[0].playLists.filter(
          (value: any) => Object.keys(value).length !== 0
        );

        res.status(200).json(newData);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } else if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authOptions);

    const { playListId } = req.query;
    const { userId, isAdding, videoId } = req.body;
    if (!session) {
      res.status(404).json("User not found");
    } else if (session.user.id !== userId) {
      res.status(401).json("Unauthorized");
    } else {
      try {
        if (!isAdding) {
          await client
            .patch(userId)
            .unset([
              `playLists[_key == "${playListId}"].videos[_ref== "${videoId}"]`,
            ])
            .commit();
        } else {
          const data = await client
            .patch(userId)
            .insert("after", `playLists[_key == "${playListId}"].videos[-1]`, [
              {
                _type: "reference",
                _key: uuid(),
                _ref: videoId,
              },
            ])
            .commit();
        }

        res.status(200).json("Adjust PlayList Successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    }
  }
}
