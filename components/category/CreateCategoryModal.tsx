'use client'
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

export function CreateCategoryModal() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size={"sm"}>Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-slate-400 shadow-xl space-y-3">
                <DialogHeader>
                    <DialogTitle>New Category</DialogTitle>
                </DialogHeader>
                <FormCategory formType="create" setOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    )
}
