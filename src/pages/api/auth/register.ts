import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, username, email, password, repeatPassword } = req.body;

    if (!name || !username || !email || !password || !repeatPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUserByUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    const existingUserByEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUserByUsername || existingUserByEmail) {
      return res
        .status(400)
        .json({ message: "User (username and/or email) already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const newUser = await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      jwtSecret as Secret,
      {
        expiresIn: "1d",
      }
    );

    const tokenCookie = serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/",
    });

    const usernameCookie = serialize("username", newUser.username, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/",
    });

    res.setHeader("Set-Cookie", [tokenCookie, usernameCookie]);
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
