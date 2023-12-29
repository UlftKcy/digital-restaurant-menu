import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const mealId = await request.json();

    try {

        await prisma.meal.delete({
            where: {
                id: mealId
            },
        })

        return NextResponse.json({
            status: 200,
            statusText: "Meal is successfully deleted",
        })

    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma hata mesajını döndürür
            return NextResponse.json({
                status: 500,
                error: "Failed to create meal related to db",
                errorMessage: error.message,
                code: error.code,
                meta: error.meta,
            });
        } else {
            // Diğer hata türlerini işler
            return NextResponse.json({
                status: 500,
                error: "Failed to create meal",
                errorMessage: error.message,
            });
        }
    }
}