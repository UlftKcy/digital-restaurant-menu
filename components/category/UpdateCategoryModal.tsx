'use client';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FormCategory from "./FormCategory"
import { useState } from "react";
import { CategoryType } from "@/types";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function UpdateCategoryModal(category: CategoryType) {
    const [open, setOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleDeleteCategory = async () => {
        setIsDelete(true);
        const response = await fetch("/api/category/delete", {
            method: "DELETE",
            body: JSON.stringify(category.id),
            headers: {
                "Content-Type": "appication/json"
            }
        })
        if (!response.ok) {
            setIsDelete(false);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Category cannot be deleted",
            })
        }else{
            setOpen(false);
            setIsDelete(false);
            toast({
                description: "Category is deleted",
            })
            router.refresh();
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full py-7 text-ellipsis overflow-hidden capitalize">{category.name}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-slate-400 shadow-xl">
                <DialogHeader>
                    <DialogTitle>Update Category</DialogTitle>
                </DialogHeader>
                <FormCategory formType="update" setOpen={setOpen} category={category} />
                {!isDelete ? (
                    <Button variant="destructive" onClick={handleDeleteCategory}>Remove</Button>
                ) : (
                    <Button disabled className="w-full">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Removing..
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    )
}