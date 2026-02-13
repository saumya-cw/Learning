export type Nutriments = {
  "energy-kcal_100g"?: number;
  proteins_100g?: number;
  fat_100g?: number;
  carbohydrates_100g?: number;
};

export type Product = {
  product_name?: string;
  brands?: string;
  nutriments?: Nutriments;
};

export type FoodResponse = {
  code: string;
  status: number;
  status_verbose: string;
  product?: Product;
};
