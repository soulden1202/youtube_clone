// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserPlayListDetail } from "../../../../utils/queries";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { client } from "../../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    const { userId, playListId } = req.query;

    console.log(session);

    // console.log("frombackend", playListId, userId);
    // if (!session) {
    //   res.status(404).json("User not found");
    // } else if (session.user.id !== userId) {
    //   res.status(401).json("Unauthorized");
    // } else {
    try {
      const query = getUserPlayListDetail(
        userId.toString(),
        playListId.toString()
      );

      const data = await client.fetch(query);

      res.status(200).json(data[0].playLists);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
