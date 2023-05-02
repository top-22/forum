import { PrismaClient, ThreadType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let prisma = new PrismaClient();

  // Get data submitted in request's body.
  const body = req.body;
  const room = body.room as string;
  const type = body.type as ThreadType;
  const name = body.name as string;
  const description = body.description as string;
  const tags = ((body.tags as string) ?? "")
    .toLowerCase()
    .split(" ")
    .filter((tag) => tag != "");
  const readOnly = Boolean(body.readOnly as undefined | "on");
  const options = body.options as string[];
  const endtime = body.endtime as string;

  const roomUserIds =
    (
      await prisma.room.findFirstOrThrow({
        where: { id: parseInt(room) },
        include: { users: true },
      })
    ).users.map((user) => user.userId) || [];

  const result = await prisma.thread.create({
    data: {
      name,
      description,
      type,
      room: { connect: { id: parseInt(room) } },
      tags: {
        connectOrCreate: tags.map((tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          };
        }),
      },
      creator: {
        connect: {
          id: roomUserIds[Math.floor(Math.random() * roomUserIds.length)],
        },
      },
      readOnly,
      options,
      endtime,
    },
  });

  prisma.$disconnect();
  res.redirect(`/room/${room}/${result.id}`);
}
