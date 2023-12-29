import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const category_name = await request.json();

  try {
    const category = await prisma.category.create({
      data: {
        name: category_name
      }
    })
    return NextResponse.json({
      status: 200,
      statusText: "Category is successfully added",
      data: category
    })

  } catch (error: any) {

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma hata mesajını döndürür
      return NextResponse.json({
        status: 500,
        error: "Failed to create category related to db",
        errorMessage: error.message,
        code: error.code,
        meta: error.meta,
      });
    } else {
      // Diğer hata türlerini işler
      return NextResponse.json({
        status: 500,
        error: "Failed to create category",
        errorMessage: error.message,
      });
    }
  }
}