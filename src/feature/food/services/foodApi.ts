import axios from "axios";
import type { Product } from "./food.type";

const BASE_URL =
  import.meta.env.VITE_MOOD_API_URL ??
  "https://world.openfoodfacts.org/api/v0/product/737628064502.json";

export const fetchFood = async (): Promise<Product | null> => {
  try {
    const { data } = await axios.get(BASE_URL);
    if (data.status !== 1 || !data.product) return null;

    const { product_name, brands, nutriments } = data.product;
    const usefulData = { product_name, brands, nutriments };

    console.log("data:", usefulData);
    return usefulData;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};
