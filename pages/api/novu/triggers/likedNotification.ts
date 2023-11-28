// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../utils/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { Novu } from "@novu/node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY || "");
  if (req.method === "PUT") {
    const { subscriberId, firstName, lastName, videoLink } = req.body;

    console.log(subscriberId, firstName, lastName, videoLink);

    const notificationWorkflowId = "liked";

    await novu
      .trigger(notificationWorkflowId, {
        to: {
          subscriberId: subscriberId,
        },
        payload: {
          firstName: firstName,
          lastName: lastName,
          videoLink: videoLink,
        },
      })
      .then((response) => {
        console.log(response);
        return res.status(200).json;
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json;
      });
  }
}
