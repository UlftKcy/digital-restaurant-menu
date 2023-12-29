"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MealTypes } from "@/types";
import { ShoppingCart, Soup } from "lucide-react";
import Image from "next/image";

export default function MenuCardList({ meal }: { meal: MealTypes }) {
  const mealImage =
    meal.MealImage && meal.MealImage.length > 0
      ? meal.MealImage[0].secure_url
      : null;

  return (
    <Card
      key={meal.id}
      className="bg-slate-50 drop-shadow-sm mx-auto w-full h-full hover:drop-shadow-lg"
    >
      <CardHeader className="h-3/5">
        {mealImage ? (
          <Image
            src={mealImage}
            className="rounded-md w-full h-full"
            width={200}
            height={200}
            quality={100}
            alt={meal.name}
          />
        ) : (
          <Soup className="text-slate-300 w-full h-full mx-auto"/>
        )}
      </CardHeader>
      <CardContent className="flex flex-col space-y-2 pb-3 h-1/5">
        <span className="font-semibold text-sm">{meal.name}</span>
        <span className="text-xs text-slate-400 truncate">
          {meal.description ? meal.description : "---"}
        </span>
      </CardContent>
      <CardFooter className="flex items-center justify-between pb-3 h-1/5">
        <span className="text-orange-600 font-semibold tracking-wider">
          ${meal.price}
        </span>
        <Button type="button" size="icon" variant="outline" className="group">
          <ShoppingCart className="h-4 w-4 text-orange-600 group-hover:fill-current" />
        </Button>
      </CardFooter>
    </Card>
  );
}
