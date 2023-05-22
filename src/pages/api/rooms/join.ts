import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roomId, userId } = req.body;

  try {
    await prisma.roomUser.create({
      data: {
        roomId,
        userId,
        role: Role.MEMBER,
      },
    });

    res.status(200).json({ message: "Joined room successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to join room" });
  } finally {
    await prisma.$disconnect();
  }
}
