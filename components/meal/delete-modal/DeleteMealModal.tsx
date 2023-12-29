'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteMealModalProps = {
    mealId: number | undefined
}

export default function DeleteMealModal({mealId}: DeleteMealModalProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleDeleteMeal = async () => {
        try {
            const response = await fetch("/api/meal/delete", {
                method: "POST",
                body: JSON.stringify(mealId),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
               return toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Meal cannot be deleted",
                })
            }
            
            toast({
                description: "Meal is deleted",
            });

            router.push("/admin/meal");

        } catch (error) {
            console.log("Failed to delete meal", { cause: error })
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" className="my-10">Delete Meal</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-400" onClick={handleDeleteMeal}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}