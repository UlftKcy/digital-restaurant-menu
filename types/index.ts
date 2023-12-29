export interface ListItemTypes {
  title: string;
  href: string;
}
export interface CategoryType {
  id?: number;
  name: string;
}

export interface MealTypes {
  id?: number;
  image?: MealImageTypes | null | undefined;
  MealImage?: MealImageTypes[];
  name: string;
  categoryId: string;
  price: number;
  description?: string;
  isActive?: boolean;
}

export interface MealImageTypes {
  id?: number;
  bytes: number;
  format: string;
  original_filename: string;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  mealId?: number;
}

export interface RoleType {
  name: string;
  value: string;
}
