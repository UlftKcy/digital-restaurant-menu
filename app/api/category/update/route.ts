import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const { id, category_name } = await request.json();

    try {
        await prisma.category.update({
            where: {
                id: id
            },
            data: { name: category_name }
        })

        return NextResponse.json({
            status: 200,
            statusText: "Category is updated successfully"
        })

    } catch (error: any) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma hata mesajını döndürür
            return NextResponse.json({
                status: 500,
                error: "Failed to update catyegory related to db",
                errorMessage: error.message,
                code: error.code,
                meta: error.meta,
            });
        } else {
            // Diğer hata türlerini işler
            return NextResponse.json({
                status: 500,
                error: "Failed to update catyegory",
                errorMessage: error.message,
            });
        }
    }
}