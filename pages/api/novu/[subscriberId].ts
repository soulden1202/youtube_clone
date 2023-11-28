// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Novu } from "@novu/node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY || "");
  if (req.method === "PUT") {
    const { subscriberId } = req.query;
    const { firstName, lastName, avatar } = req.body;
    await novu.subscribers.identify(subscriberId.toString(), {
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
    });
  } else if (req.method === "GET") {
    const { subscriberId } = req.query;

    await novu.subscribers
      .get(subscriberId.toString())
      .then(() => {
        res.status(200).json("Ok");
      })
      .catch((err) => {
        res.status(404).json("Not Found");
      });
  }
}
