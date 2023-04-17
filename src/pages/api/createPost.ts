import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let prisma = new PrismaClient();

  // Get data submitted in request's body.
  const body = req.body;
  const room: string = body.room;
  const title: string = body.title;
  const description: string = body.description;
  const tags: string = body.tags;
  const commentsOff: boolean = body.commentsOff;
  const options: string[] = body.options;
  const endtime: string = body.endtime;

  let tagsArray: string[] = [];

  if (tags.length > 0) {
    tagsArray = tags.split(" ");
  }

  const result = await prisma.thread.create({
    data: {
      name: title,
      description: description,
      room: { connect: { id: parseInt(room) } },
      tags: {
        connectOrCreate: tagsArray.map((tag) => {
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
