import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CategoryType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormCategoryProps = {
    formType: string;
    setOpen: (e: boolean) => void;
    category?: CategoryType;
}

const FormSchema = z.object({
    category_name: z.string().min(3, {
        message: "Category Name must be at least 3 characters.",
    }),
})

const createForm = async (data: string) => {
    const response = await fetch("/api/category/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed to create category");
    }
}


const updateForm = async (category_name: string, category?: CategoryType) => {
    const formData = { "category_name": category_name, "id": category?.id }

    const response = await fetch("/api/category/update", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "appication/json"
        }
    })
    if (!response.ok) {
        throw new Error("Failed to update category");
    }
}

export default function FormCategory({ formType, setOpen, category }: FormCategoryProps) {
    const [isSubmit, setIsSubmit] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            category_name: category?.name ?? ""
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsSubmit(true);
        formType === "create" ? createForm(data.category_name) : updateForm(data.category_name, category);

        setIsSubmit(false);
        setOpen(false);

        toast({
            description: `${formType === 'create' ? 'Category is created':'Category is updated'}`,
          })

        router.refresh();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="category_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Category Name" {...field} className="capitalize" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isSubmit ? (
                    <Button type="submit" className="w-full">Save</Button>
                ) : (
                    <Button disabled className="w-full">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    </Button>
                )}
            </form>
        </Form>
    )
}