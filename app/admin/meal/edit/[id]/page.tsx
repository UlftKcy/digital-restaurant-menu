import { serverUrl } from "@/constants";
import { fetchCategories } from "@/utils/service";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import DeleteMealModal from "../../../../../components/meal/delete-modal/DeleteMealModal";
import EditMealForm from "../../../../../components/meal/edit/EditMealForm";

async function fetchMeal(id: number) {
    const response = await fetch(`${serverUrl}/api/meal/fetch-meal-detail?id=${id}`, { cache: "no-store" });

    if (!response.ok) {
        throw new Error("Failed to fetch meal");
    }

    return response.json();
}

export default async function EditMeal({ params }: { params: { id: string } }) {
    const fetchMealData = await fetchMeal(parseInt(params.id));
    const fetchCategoriesData = await fetchCategories();

    const [meal, categories] = await Promise.all([fetchMealData, fetchCategoriesData])

    if (!meal.data) {
        return <div>Failed to fetch meal...</div>
    }

    return (
        <Card className="m-5 drop-shadow-lg">
            <CardHeader className="flex-row justify-between">
                <div>
                    <CardTitle>Edit meal</CardTitle>
                    <CardDescription>Update your meal.</CardDescription>
                </div>
                <DeleteMealModal mealId={meal.data.id} />
            </CardHeader>
            <Separator className="my-2" />
            <CardContent className="p-5">
                <Suspense fallback={<div>Loading...</div>}>
                    <EditMealForm meal={meal.data} categories={categories} />
                </Suspense>
            </CardContent>
        </Card>
    )
}