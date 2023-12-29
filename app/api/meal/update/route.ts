import { prisma } from "@/lib/prisma";
import { MealTypes } from "@/types";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { id, name, categoryId, price, description, image } = await request.json() as MealTypes;

    try {
        const meal = await prisma.meal.update({
            where: {
                id: id
            },
            data: {
                name: name,
                price: Number(price),
                description: description || '',
                categoryId: Number(categoryId)
            }
        })

        const isExistMealImage = await prisma.meal.findUnique({
            where: {
                id: meal.id
            },
            include: {
                MealImage: true
            }
        })


        if (image && isExistMealImage?.MealImage.length === 0) {
            /**
            * if meal has not image, add image. 
            */
            const { bytes, format, original_filename, public_id, resource_type, secure_url, signature } = image;

            await prisma.mealImage.create({
                data: {
                    bytes: Number(bytes),
                    format: String(format),
                    original_filename: String(original_filename),
                    public_id: String(public_id),
                    resource_type: String(resource_type),
                    secure_url: String(secure_url),
                    signature: String(signature),
                    mealId: meal.id,
                }
            })
        } else if (image && isExistMealImage?.MealImage.length !== 0) {
            await prisma.mealImage.deleteMany({
                where: {
                    mealId: meal.id
                }
            });

            /**
            * if meal has not image, add image. 
            */
            const { bytes, format, original_filename, public_id, resource_type, secure_url, signature } = image;

            await prisma.mealImage.create({
                data: {
                    bytes: Number(bytes),
                    format: String(format),
                    original_filename: String(original_filename),
                    public_id: String(public_id),
                    resource_type: String(resource_type),
                    secure_url: String(secure_url),
                    signature: String(signature),
                    mealId: meal.id,
                }
            })
        } else {
            /**
            * if existed image removes, the image deletes. 
            */
            await prisma.mealImage.deleteMany({
                where: {
                    mealId: meal.id
                }
            });
        }

        return NextResponse.json({
            status: 200,
            statusText: "Meal is successfully updated",
            data: isExistMealImage

        })

    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma hata mesajını döndürür
            return NextResponse.json({
                status: 500,
                error: "Failed to update meal related to db",
                errorMessage: error.message,
                code: error.code,
                meta: error.meta,
            });
        } else {
            // Diğer hata türlerini işler
            return NextResponse.json({
                status: 500,
                error: "Failed to update meal",
                errorMessage: error.message,
            });
        }
    }
}