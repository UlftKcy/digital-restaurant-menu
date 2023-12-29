import { MealTypes } from "@/types";

export async function fetchCategories() {
    const response = await fetch(`${process.env.NEXT_API_BASE_URL}/api/category/fetch-category`,{cache:"no-cache"});
    if (!response.ok) {
        throw new Error("Failed to fetch catgories");
    }
    const { data } = await response.json();
    return data;
};

export async function fetchMeals():Promise<MealTypes[]> {
    const response = await fetch(`${process.env.NEXT_API_BASE_URL}/api/meal/fetch-meal`, { cache: "no-cache" });
  
    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }
    const { data } = await response.json();
    return data;
  
  }