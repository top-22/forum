import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roomId, userId } = req.body;

  try {
    await prisma.roomUser.delete({
      where: {
        roomId_userId: {
          roomId,
          userId,
        },
      },
    });

    res.status(200).json({ message: "Left room successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to leave room" });
  } finally {
    await prisma.$disconnect();
  }
}
