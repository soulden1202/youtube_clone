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

      const userDoc = {
        _type: "user",
        _id: user._id,
        userName: user.userName,
        image: user.image,
      };

      client
        .createIfNotExists(userDoc)
        .then(() => res.status(200).json("User added to database"));
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
