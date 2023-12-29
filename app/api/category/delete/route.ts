import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const categoryId  = await request.json();

    try {
        await prisma.category.delete({
            where: { id: categoryId }
        })

        return NextResponse.json({
            status: 200,
            statusText: "Category is successfully deleted",
        })

    } catch (error: any) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma hata mesajını döndürür
            return NextResponse.json({
                status: 500,
                error: "Failed to delete category related to db",
                errorMessage: error.message,
                code: error.code,
                meta: error.meta,
            });
        } else {
            // Diğer hata türlerini işler
            return NextResponse.json({
                status: 500,
                error: "Failed to delete category",
                errorMessage: error.message,
            });
        }
    }
}