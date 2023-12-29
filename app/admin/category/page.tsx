import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCategoryModal } from "@/components/category/CreateCategoryModal";
import { CategoryType } from "@/types";
import UpdateCategoryModal from "@/components/category/UpdateCategoryModal";
import { fetchCategories } from "@/utils/service";

export default async function Categories() {
  const categories = await fetchCategories();
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Categories</CardTitle>
        <CreateCategoryModal />
      </CardHeader>
      <CardContent>
        {categories.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-auto gap-4">
            {categories.map((category: CategoryType) => (
              <div key={category.id}>
                 <UpdateCategoryModal {...category} />
              </div>
            ))}
          </div>
        ) : (
          <div>No category...</div>
        )}
      </CardContent>
    </Card>
  );
}
