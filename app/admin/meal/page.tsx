import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "../../../components/meal/data-table";
import { columns } from "../../../components/meal/columns";
import Link from "next/link";
import { fetchMeals } from "@/utils/service";

export default async function Meals() {
  const meals = await fetchMeals()
  return (
    <Card className="border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Meals</CardTitle>
        <Button variant="default" size={"sm"} asChild>
          <Link href="/admin/meal/create">Add Meal</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={meals} />
      </CardContent>
    </Card >
  )
}