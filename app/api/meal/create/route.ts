import { prisma } from "@/lib/prisma";
import { MealImageTypes, MealTypes } from "@/types";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { name, categoryId, price, description, image } = await request.json() as MealTypes;

    try {
        const meal = await prisma.meal.create({
            data: {
                name: name,
                price: price,
                description: description || '',
                categoryId: Number(categoryId)
            }
        })

        if (meal && image) {
            const { bytes, format, original_filename, public_id, resource_type, secure_url, signature } = image as MealImageTypes;

            await prisma.mealImage.create({
                data: {
                    bytes: Number(bytes),
                    format: String(format),
                    original_filename: String(original_filename),
                    public_id: String(public_id),
                    resource_type: String(resource_type),
                    secure_url: String(secure_url),
                    signature: String(signature),
                    mealId: meal.id
                },
            })
        }

        return NextResponse.json({
            status: 200,
            statusText: "Meal is successfully added",
            data: meal
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