// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const user = req.body;

      client
        .createIfNotExists(user)
        .then(() => res.status(200).json("Login sucess"));
      client.getDocument(user._id).then((data) => {
        if (!data) return;
        if (data.userName !== user.userName) {
          client.patch(data._id).set({ userName: user.userName });
        }
        if (data.image !== user.image) {
          client.patch(data._id).set({ image: user.image });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("AUTH_ERROR");
    }
  }
}
