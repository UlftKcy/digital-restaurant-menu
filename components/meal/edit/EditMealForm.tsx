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
import Image from "next/image";
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

export default function EditMealForm({ meal, categories }: { meal: MealTypes, categories: CategoryType }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showMealImg, setShowMealImg] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    let image = meal.MealImage;
    let imageUrl = "";

    for (const img of image as any) {
        imageUrl = img.secure_url;
        break;
    };


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: meal.name,
            categoryId: String(meal.categoryId),
            price: meal.price,
            description: meal.description,
        },
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            setSelectedFile(selectedFile);
        }
    }

    const updateMealImage = async (selectedFile: File | null) => {

        if (!selectedFile) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append('upload_preset', 'rest_menu_app');

            const response = await fetch('https://api.cloudinary.com/v1_1/dcdnxrilp/image/upload', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Failed to upload meal image",
                })
            }

            toast({
                description: "Meal Image is created",
            });

            const { bytes, format, original_filename, public_id, resource_type, secure_url, signature } = await response.json();

            return { bytes, format, original_filename, public_id, resource_type, secure_url, signature };

        } catch (error) {
            console.log("Failed to update meal image", { cause: error })
        }
    }

    const updateMeal = async (formData: MealTypes) => {

        try {
            const response = await fetch("/api/meal/update", {
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
                    description: "Failed to update meal",
                })
            } else {
                toast({
                    description: "Meal is updated",
                });

                const meal = await response.json();
                return meal;
            }
        } catch (error) {
            console.log("Failed to update meal", { cause: error })
        }

    }

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsDisabled(true);

        let uploadedImage = null;

        if (selectedFile !== null) {
            uploadedImage = await updateMealImage(selectedFile);
        }

        const mealId = meal.id;

        let formData: MealTypes = { ...values, id: mealId, image: uploadedImage };

        const newMeal = await updateMeal(formData);

        if (newMeal) {
            router.push("/admin/meal");
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-5">
                <div className="grid grid-cols-4 auto-rows-max gap-10">
                    <div className="md:col-span-1 col-span-4 mx-auto">
                        {
                            imageUrl && showMealImg ?
                                <div className="space-y-3">
                                    <Image className="rounded-md" src={`${imageUrl}`} width={200} height={200} alt="meal_image" />
                                    <Button onClick={() => setShowMealImg(false)} variant="outline" size="sm" className="w-full">Remove Image</Button>
                                </div>
                                :
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => {
                                        return (

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
                                        )
                                    }}
                                />
                        }
                    </div>
                    <div className="md:col-span-3 col-span-4 space-y-5">
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
                                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
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
                        <Button type="submit" className="mr-5 disabled:opacity-80" disabled={isDisabled}>
                            {isDisabled ? <Loader2 size={16} className="mr-2 animate-spin" /> : ""}
                            Update Meal
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}