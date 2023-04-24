import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let prisma = new PrismaClient();

  // Get data submitted in request's body.
  const body = req.body;
  const room = body.room as string;
  const title = body.title as string;
  const description = body.description as string;
  const tags = body.tags as string[];
  const commentsOff = body.commentsOff as boolean;
  const options = body.options as string[];
  const endtime = body.endtime as string;

  const result = await prisma.thread.create({
    data: {
      name: title,
      description: description,
      room: { connect: { id: parseInt(room) } },
      tags: {
        connectOrCreate: tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      },
      commentsOff: commentsOff,
      options: options,
      endtime: endtime,
    },
  });

  res.json(result);
}
