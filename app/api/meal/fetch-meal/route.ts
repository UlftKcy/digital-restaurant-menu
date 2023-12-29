import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const meals = await prisma.meal.findMany({
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
            statusText: "Meals is fetched successfully",
            data: meals
        })


    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma hata mesajını döndürür
            return NextResponse.json({
                status: 500,
                error: "Failed to meals is fetched related to db",
                errorMessage: error.message,
                code: error.code,
                meta: error.meta,
            });
        } else {
            // Diğer hata türlerini işler
            return NextResponse.json({
                status: 500,
                error: "Failed to meals is fetched",
                errorMessage: error.message,
            });
        }
    }
}