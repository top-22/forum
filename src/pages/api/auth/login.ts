import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // ? Do we need to check for empty fields
  // ? Client-side validation should be enough
  // if (!email || !password) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: "JWT secret not configured" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    jwtSecret as Secret,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({
    message: "Logged in successfully",
    username: user.username,
    token,
  });
}