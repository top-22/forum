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

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: { room: true },
  });

  if (!thread) {
    return res.status(400).json({ message: "Thread not found" });
  }

  const roomUser = await prisma.roomUser.findFirst({
    where: { userId: userId, roomId: thread.roomId },
  });

  const isJoined = !!roomUser;

  if (!isJoined) {
    return res.status(400).json({ message: "User not in room" });
  }

  if (thread.readOnly && user.name != thread.creatorName) {
    return res.status(400).json({ message: "Thread is ReadOnly" });
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
