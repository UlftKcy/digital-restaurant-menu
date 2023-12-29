'use client';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CategoryType, MealTypes } from "@/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    image: z.string().optional(),
    name: z.string().min(3, {
        message: "Meal Name must be 3 or more characters long",
    }),
    categoryId: z.string(),
    price: z.number().positive(),
    description: z.string().optional(),
})

export default function CreateMealForm(categories: CategoryType) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,
            description: "",
        },
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            setSelectedFile(selectedFile);
        }
    }

    const uploadMealImage = async (selectedFile: File | null) => {

        if (!selectedFile) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append('upload_preset', 'rest_menu_app');

            const response = await fetch('https://api.cloudinary.com/v1_1/dcdnxrilp/image/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Meal Image be deleted",
                })
            } else {
                toast({
                    description: "Meal Image is created",
                });

                const { bytes, format, original_filename, public_id, resource_type, secure_url, signature } = await response.json();

                return { bytes, format, original_filename, public_id, resource_type, secure_url, signature };
            }
        } catch (error) {
            console.log("Faield to upload meal image", { cause: error })
        }
    }

    const createMeal = async (formData: MealTypes) => {

        try {
            const response = await fetch("/api/meal/create", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                setIsDisabled(false);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Meal be deleted",
                })
            }

            toast({
                description: "Meal is created",
            });

            const meal = await response.json();

            return meal;

        } catch (error) {
            console.log("Faield to create meal", { cause: error })
        }
    }


    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsDisabled(true);

        const uploadedImage = await uploadMealImage(selectedFile);

        let formData: MealTypes = { ...values, image: uploadedImage };

        const newMeal = await createMeal(formData);

        if (newMeal) {
            router.push("/admin/meal");
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="sm:w-2/3 w-full mx-auto space-y-5">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meal Image</FormLabel>
                                <FormControl>
                                    <Input id="picture" type="file" {...field} onChange={handleChange} />
                                </FormControl>
                                <FormDescription>
                                    This is your meal image.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meal Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Meal Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your meal name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(categories).map((category: CategoryType) => (
                                            <SelectItem key={String(category.id)} value={String(category.id)} className="capitalize">{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    This is your meal name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Price" {...field} onChange={event => field.onChange(+event.target.value)} />
                                </FormControl>
                                <FormDescription>
                                    This is your meal price.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your meal description.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="ml-auto disabled:opacity-80" disabled={isDisabled}>
                        {isDisabled ? <Loader2 size={16} className="mr-2 animate-spin" /> : ""}
                        Create Meal
                    </Button>
                </div>
            </form>
        </Form>
    )
}