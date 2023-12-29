import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const mealId = Number(request.nextUrl.searchParams.get("id"))

    try {
        const meal = await prisma.meal.findUnique({
            where: {
                id: mealId
            },
            include:{
                MealImage:{
                    select:{
                        secure_url:true,
                    }
                }
            }
        });
        return NextResponse.json({
            status: 200,
            statusText: "Meal is fetched successfully",
            data: meal
        })
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma hata mesajını döndürür
            return NextResponse.json({
                status: 500,
                error: "Failed to meal is fetched related to db",
                errorMessage: error.message,
                code: error.code,
                meta: error.meta,
            });
        } else {
            // Diğer hata türlerini işler
            return NextResponse.json({
                status: 500,
                error: "Failed to meal is fetched",
                errorMessage: error.message,
            });
        }
    }
}