import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, password, role } = (await request.json()) as {
    name: string;
    email: string;
    password: string;
    role: string;
  };

  try {
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Please fill required fields", status: 400 });
    }

    const hashed_password = await hash(password, 12);

    const isExistUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    /**
     * check exist user
     */
    if (isExistUser) {
      return NextResponse.json({ statusText: "Email is existed", status: 400 });
    }
    /**
     * create new user
     */
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashed_password,
        role: role
      },
    });
    const newUser = { name: user.name, email: user.email };

    return NextResponse.json({ data: newUser, status: 200, statusText: "User is created", });

  } catch (error: any) {

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma hata mesajını döndürür
      return NextResponse.json({
        status: 500,
        error: "Failed to register user related to db",
        errorMessage: error.message,
        code: error.code,
        meta: error.meta,
      });
    } else {
      // Diğer hata türlerini işler
      return NextResponse.json({
        status: 500,
        error: "Failed to register user",
        errorMessage: error.message,
      });
    }
  }
}