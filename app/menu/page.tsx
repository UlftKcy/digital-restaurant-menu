import { MealTypes } from "@/types";
import React from "react";
import MenuCardList from "@/components/menu/MenuCardList";
import EmptyMenu from "@/components/menu/EmptyMenu";
import { fetchMeals } from "@/utils/service";

export default async function Menu() {
  const meals = await fetchMeals();

  return meals.length === 0 ? (
    <EmptyMenu />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 auto-rows-max gap-10 p-5">
      {meals.map((meal: MealTypes) => {
        return <MenuCardList key={meal.id} meal={meal} />;
      })}
    </div>
  );
}
