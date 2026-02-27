export type Nutriments = {
  "energy-kcal_100g"?: number;
  proteins_100g?: number;
  fat_100g?: number;
  carbohydrates_100g?: number;
};

export type Product = {
  product_name?: string;
  nutriments?: Nutriments;
};

export type WgerIngredient = {
  name: string;
  energy: number | null;
  protein: string | null;
  carbohydrates: string | null;
  fat: string | null;
};

export type WgerResponse = {
  results: WgerIngredient[];
};
