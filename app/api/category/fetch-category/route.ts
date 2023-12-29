import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        
        return NextResponse.json({
            status: 200,
            statusText: "Category is fetched successfully",
            data: categories
        })
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma hata mesajını döndürür
            return NextResponse.json({
                status: 500,
                error: "Failed to category is fetched related to db",
                errorMessage: error.message,
                code: error.code,
                meta: error.meta,
            });
        } else {
            // Diğer hata türlerini işler
            return NextResponse.json({
                status: 500,
                error: "Failed to category is fetched",
                errorMessage: error.message,
            });
        }
    }
}