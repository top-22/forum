import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { content, userId, threadId } = req.body;

  if (!content || !userId || !threadId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await prisma.message.create({
      data: {
        content,
        userId,
        threadId,
      },
    });

    res.status(200).json({ message: "Created message successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create message" });
  } finally {
    await prisma.$disconnect();
  }
}
