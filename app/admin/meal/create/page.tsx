import CreateMealForm from "@/components/meal/create/CreateMealForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchCategories } from "@/utils/service";
import { Suspense } from "react";

export default async function CreateMeal() {
    const categories = await fetchCategories();
    return (
        <Card className="m-5 drop-shadow-lg">
            <CardHeader>
                <CardTitle>Create meal</CardTitle>
                <CardDescription>Create your new meal.</CardDescription>
            </CardHeader>
            <Separator className="my-2" />
            <CardContent className="p-5">
                <Suspense fallback={<div>Loading...</div>}>
                    <CreateMealForm {...categories} />
                </Suspense>
            </CardContent>
        </Card>
    )
}