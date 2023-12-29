"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MealTypes } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Soup } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<MealTypes>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      let image = row.original.MealImage;
      const mealImage = image && image.length > 0 ? image[0].secure_url : null;

      return mealImage ? <Image src={`${mealImage}`} width={30} height={30} alt="meal_image" /> : <Soup className="text-slate-500" />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) =>
      <Button
        className="pl-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let status = row.original.isActive ? <Badge>Active</Badge> : <Badge variant="destructive">Not Active</Badge>

      return <div>{status}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mealId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/admin/meal/edit/${mealId}`}>Edit Meal</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
